/* eslint-disable @typescript-eslint/no-unused-vars */
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";

@ValidatorConstraint({ name: "isCpfValid", async: false })
export class IsCpfValidConstraint implements ValidatorConstraintInterface {
    validate(cpf: string, _args: ValidationArguments) {

        if(!cpf) {
            return false;
        }
        
        const formatCpf = cpf.replace(/[., -]/g, "");
        const regex = /^\d{11}$/;

        const test = regex.test(formatCpf);

        return test;
    }

    defaultMessage(_args: ValidationArguments) {
        return "Invalid CPF";
    }
}
