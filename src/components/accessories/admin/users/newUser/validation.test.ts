import { describe, expect, it } from 'vitest';
import { userNameRules } from './validation';

describe('userName rules', () => {
	it('should pass', () => {
		expect(userNameRules.test('johndoe')).toBeTruthy();
		expect(userNameRules.test('johndoe42')).toBeTruthy();
		expect(userNameRules.test('42')).toBeTruthy();
		expect(userNameRules.test('john.doe')).toBeTruthy();
		expect(userNameRules.test('john-doe')).toBeTruthy();
		expect(userNameRules.test('john_doe')).toBeTruthy();
	});
	it('should filter out', () => {
		expect(userNameRules.test('Johndoe')).toBeFalsy();
		expect(userNameRules.test('johnDoe')).toBeFalsy();
		expect(userNameRules.test('john doe')).toBeFalsy();
		expect(userNameRules.test('john/doe')).toBeFalsy();
		expect(userNameRules.test('すず')).toBeFalsy();
		expect(userNameRules.test('j̵̨̨̧͖̠̩̤̗̟̲̯̭̫̰͆͛̏͛͒́̂̔̅͘͘̚̕͝͝ȯ̵̫̭̮̖̀̓̾̉͋͋̌̇͘h̶̡̢̡̜̻̥͙̳͉̰̟̬͚̍̃̽̎͒̋̄̔͋͘͝͝ͅn̷̜̠̰͍̤̰̺̠͌̌̒͑̓̌̂̒͗͒͗̐͝͝͠')).toBeFalsy();
	});
});
