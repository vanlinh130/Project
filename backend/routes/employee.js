const router = require('express').Router();
const Employee = require('../models/employee');
const bcrypt = require('bcryptjs');
const config = require('../config');
const employee = require('../models/employee');
const jwt = require('jsonwebtoken');


// 1. Post thông tin của employee lên client
router.post('/', async (req, res, next) => {
    let employee = new Employee();

    employee.name = req.body.name; 
    employee.work = req.body.work;
    employee.email = req.body.email;
    employee.password = bcrypt.hashSync(req.body.password);
    employee.gender = req.body.gender;
    employee.role = req.body.role;
    employee.phone = req.body.phone;
    employee.enrollDate = req.body.enrollDate;
    employee.image = employee.gravatar();
    employee.status = req.body.status;

    try {
        employee = await employee.save();

        if (!employee) {
            return res.status(500).json({
                success: false,
                message: 'The employee cannot be created',
            });
        }

        res.json({
            success: true,
            employee: employee
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'The employee cannot be created',
            error: error
        });
    }

})

// 5. Login
router.post('/login', async (req, res, next) => {

    try {
        let employee = await Employee.findOne({ email: req.body.email });

        // Nếu employee ko tồn tại 
        if (!employee) {
            return res.status(500).json({
                success: false,
                message: 'The employee not found',
            });
        }


        // Nếu employee tồn tại thì nó sẽ so sánh password đc gữi tới và password tồn tại trong CSDL,
        // ở CSDL tồn tại dưới dạng mã băm nên ta mới gọi phương thức compareSync
        if (employee && bcrypt.compareSync(req.body.password, employee.password)) {
            const token = jwt.sign({
                employeeId: employee._id
            }, config.SECRET, { expiresIn: '1d' })

            res.status(200).json({
                success: true,
                employee: employee.employeeId,
                token: token
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Password is wrong',
            });
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        });
    }

})


//2. lấy về tất cả các employee 
router.get('/', async (req, res, next) => {
    const employeeList = await Employee.find().select('-password');

    if (!employeeList) {
        return res.status(500).json({
            success: false,
            message: 'No employee existed',
        });
    }

    res.json({
        success: true,
        employees: employeeList
    })
})


// 3. GET/PUT Lấy ra 1 employee và chỉnh sữa nó
router.get('/:id', async (req, res, next) => {
    const employee = await Employee.findById(req.params.id).select('-password');

    if (!employee) {
        return res.status(500).json({
            success: false,
            message: 'No employee existed',
        });
    }

    res.json({
        success: true,
        employee: employee
    })
})

router.put('/:id', async (req, res, next) => {
    const employeeExist = await Employee.findById(req.params.id)

    if (!employeeExist) {
        return res.status(500).json({
            success: false,
            message: 'No employee existed',
        });
    }

    let newPassword = req.body.password ? bcrypt.hashSync(req.body.password) : employeeExist.password;

    let employee = {
        name: req.body.name,
        work: req.body.work,
        email: req.body.email,
        password: newPassword,
        zone: req.body.zone,
        role: req.body.role,
        phone: req.body.phone,
        status: req.body.status,
        gender: req.body.gender,
        enrollDate: req.body.enrollDate,

    }

    try {
        const emp = await Employee.findByIdAndUpdate(req.params.id, employee, { new: true });

        if (!emp) {
            return res.status(500).json({
                success: false,
                message: 'The employee cannot be Update',
            });
        }

        res.json({
            success: true,
            employee: emp
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'The employee cannot be Update',
            error: error
        });
    }

})

// 4. Delete xóa employee 
router.delete('/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id).then(employee => {
        if (employee) {
            return res.status(200).json({
                success: true,
                message: 'The employee is Delete!',
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'Employee not Found',
            })
        }
    }).catch(error => {
        return res.status(500).json({
            success: false,
            error: error
        })
    });

})

router.get('/get/count', async (req, res) => {

    // Đem xem có bao nhiêu employee hiện có trong CSDL
    const employeeCount = await Employee.count({});

    if (!employeeCount) {
        return res.status(500).json({
            success: false,
            message: 'No employee existed',
        });
    }

    res.json({
        success: true,
        employeeCount: employeeCount
    })
})


// 6. Logout
router.get('/get/profile', async (req, res) => {

    try {
        const employee = await Employee.findById(req.user.employeeId).select('-password');

        if (!employee) {
            return res.status(500).json({
                success: false,
                message: 'No employee not found',
            });
        }

        res.json({
            success: true,
            employee: employee
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'No employee cannot be retrieved',
            error: error
        });
    }

})


module.exports = router;
