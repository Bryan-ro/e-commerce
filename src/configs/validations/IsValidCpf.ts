/* eslint-disable @typescript-eslint/no-unused-vars */
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";

@ValidatorConstraint({ name: "isCpfValid", async: false })
export class IsCpfValidConstraint implements ValidatorConstraintInterface {
    validate(cpf: string, _args: ValidationArguments) {

        cpf = cpf.replace(/\D/g, "");

        if (cpf.length !== 11) {
            return false;
        }

        return true;
    }

    defaultMessage(_args: ValidationArguments) {
        return "Invalid CPF";
    }
}
