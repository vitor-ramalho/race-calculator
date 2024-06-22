import { validate } from 'class-validator';
import { IsCPF } from './isCpf.validator';

class TestClass {
  @IsCPF()
  cpf: string;
}

describe('IsCPF', () => {
  it('should validate a correct CPF', async () => {
    const testClass = new TestClass();
    testClass.cpf = '12345678909'; // replace with a valid CPF
    const errors = await validate(testClass);
    expect(errors.length).toEqual(0);
  });

  it('should not validate an incorrect CPF', async () => {
    const testClass = new TestClass();
    testClass.cpf = '12345678901'; // replace with an invalid CPF
    const errors = await validate(testClass);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should validate a CPF with special characters', async () => {
    const testClass = new TestClass();
    testClass.cpf = '123.456.789-09'; // replace with a valid CPF with special characters
    const errors = await validate(testClass);
    expect(errors.length).toEqual(0);
  });

  it('should not validate a CPF with all identical digits', async () => {
    const testClass = new TestClass();
    testClass.cpf = '11111111111';
    const errors = await validate(testClass);
    expect(errors.length).toBeGreaterThan(0);
  });
});
