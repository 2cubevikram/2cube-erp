import SalaryModel from "../models/salary.model.js";


/******************************************************************************
 *                              Salary Controller
 ******************************************************************************/


class SalaryController {
    salaryCredit = async (req, res, next) => {
        const result = await SalaryModel.creditSalary(req.body);
        if (result === 0)
            res.status(500).send({message: "Something went wrong"});
        else res.status(200).send({message: "Salary Credited Successfully"});


    }

    getSalaryStatus = async (req, res, next) => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed
        const currentYear = currentDate.getFullYear();

        const result = await SalaryModel.salary_status({currentMonth, currentYear});
        res.status(200).send(result);
    }
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
export default new SalaryController;