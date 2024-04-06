const Employee = require("../models/Employees")

const employeeResolvers = {
    Query: {
        getEmployeeById: async (_,{id}) => {
            try{
                const employee = await Employee.findById(id);
                return employee
            }catch(error){
                throw new Error(error)
            }
        },
        getAllEmployee: async () => {
            try {
                const employees = await Employee.find({});
                if (employees.length === 0) {
                    throw new Error("No employees found");
                }
                return employees;
            } catch (error) {
                throw new Error(error)
            }
        },
    },

    Mutation: {
        addEmployee: async (_, {first_name, last_name, email, gender, salary}) => {
            try{
                const checkExist = await Employee.findOne({email: email})
                if(checkExist){
                    throw new Error("An employee if this email already exist")
                }
                const newEmployee = new Employee({first_name, last_name, email, gender, salary});
                return await newEmployee.save()
            }catch(error){
                return error
            }
        },
        updateEmployeeById: async (_, {id, first_name, last_name, email, gender, salary}) => {
            try{
                const updatedEmployee = await Employee.findByIdAndUpdate(id, {
                    $set: {
                      first_name,
                      last_name,
                      email,
                      gender,
                      salary
                    }
                  }, { new: true }); 
            
                  return updatedEmployee;
    
            }catch(error){
                return error
            }
        },
        deleteEmployeeById: async (_, { id }) => {
            try{
                const deleted = await Employee.findByIdAndDelete(id)
                if(deleted){
                    return `Employee with ID: ${id} deleted`
                }else{
                    return "Employee not found"
                }
            }catch(error){
                return error
            }
        }
    }
}
module.exports = employeeResolvers

