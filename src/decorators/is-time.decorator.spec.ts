import { validate } from 'class-validator';
import { IsTime } from './is-time.decorator';

// Test class to use the decorator
class TestTimeClass {
  @IsTime()
  timeValue: string;

  @IsTime({ message: 'Custom time error message' })
  customMessageTime: string;
}

describe('IsTime Decorator', () => {
  describe('Valid time formats', () => {
    it('should validate midnight (00:00)', async () => {
      const testInstance = new TestTimeClass();
      testInstance.timeValue = '00:00';

      const errors = await validate(testInstance);
      const timeErrors = errors.filter(error => error.property === 'timeValue');
      expect(timeErrors).toHaveLength(0);
    });

    it('should validate one minute past midnight (00:01)', async () => {
      const testInstance = new TestTimeClass();
      testInstance.timeValue = '00:01';

      const errors = await validate(testInstance);
      const timeErrors = errors.filter(error => error.property === 'timeValue');
      expect(timeErrors).toHaveLength(0);
    });

    it('should validate one minute before midnight (23:59)', async () => {
      const testInstance = new TestTimeClass();
      testInstance.timeValue = '23:59';

      const errors = await validate(testInstance);
      const timeErrors = errors.filter(error => error.property === 'timeValue');
      expect(timeErrors).toHaveLength(0);
    });

    it('should validate noon (12:00)', async () => {
      const testInstance = new TestTimeClass();
      testInstance.timeValue = '12:00';

      const errors = await validate(testInstance);
      const timeErrors = errors.filter(error => error.property === 'timeValue');
      expect(timeErrors).toHaveLength(0);
    });

    it('should validate morning time (09:30)', async () => {
      const testInstance = new TestTimeClass();
      testInstance.timeValue = '09:30';

      const errors = await validate(testInstance);
      const timeErrors = errors.filter(error => error.property === 'timeValue');
      expect(timeErrors).toHaveLength(0);
    });

    it('should validate evening time (18:45)', async () => {
      const testInstance = new TestTimeClass();
      testInstance.timeValue = '18:45';

      const errors = await validate(testInstance);
      const timeErrors = errors.filter(error => error.property === 'timeValue');
      expect(timeErrors).toHaveLength(0);
    });

    it('should validate all valid hour boundaries', async () => {
      const validHours = [
        '00', '01', '02', '03', '04', '05', '06', '07', '08', '09',
        '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
        '20', '21', '22', '23',
      ];

      for (const hour of validHours) {
        const testInstance = new TestTimeClass();
        testInstance.timeValue = `${hour}:30`;

        const errors = await validate(testInstance);
        const timeErrors = errors.filter(error => error.property === 'timeValue');
        expect(timeErrors).toHaveLength(0);
      }
    });

    it('should validate all valid minute boundaries', async () => {
      const validMinutes = [
        '00', '01', '15', '30', '45', '59',
      ];

      for (const minute of validMinutes) {
        const testInstance = new TestTimeClass();
        testInstance.timeValue = `12:${minute}`;

        const errors = await validate(testInstance);
        const timeErrors = errors.filter(error => error.property === 'timeValue');
        expect(timeErrors).toHaveLength(0);
      }
    });
  });

  describe('Invalid time formats - Hour validation', () => {
    it('should reject hour 24', async () => {
      const testInstance = new TestTimeClass();
      testInstance.timeValue = '24:00';

      const errors = await validate(testInstance);
      const timeErrors = errors.filter(error => error.property === 'timeValue');
      expect(timeErrors).toHaveLength(1);
      expect(timeErrors[0].property).toBe('timeValue');
    });

    it('should reject hour 25', async () => {
      const testInstance = new TestTimeClass();
      testInstance.timeValue = '25:00';

      const errors = await validate(testInstance);
      const timeErrors = errors.filter(error => error.property === 'timeValue');
      expect(timeErrors).toHaveLength(1);
    });

    it('should reject single digit hour without leading zero', async () => {
      const testInstance = new TestTimeClass();
      testInstance.timeValue = '9:00';

      const errors = await validate(testInstance);
      const timeErrors = errors.filter(error => error.property === 'timeValue');
      expect(timeErrors).toHaveLength(1);
    });

    it('should reject negative hour', async () => {
      const testInstance = new TestTimeClass();
      testInstance.timeValue = '-1:00';

      const errors = await validate(testInstance);
      const timeErrors = errors.filter(error => error.property === 'timeValue');
      expect(timeErrors).toHaveLength(1);
    });

    it('should reject three digit hour', async () => {
      const testInstance = new TestTimeClass();
      testInstance.timeValue = '123:00';

      const errors = await validate(testInstance);
      const timeErrors = errors.filter(error => error.property === 'timeValue');
      expect(timeErrors).toHaveLength(1);
    });
  });

  describe('Invalid time formats - Minute validation', () => {
    it('should reject minute 60', async () => {
      const testInstance = new TestTimeClass();
      testInstance.timeValue = '12:60';

      const errors = await validate(testInstance);
      const timeErrors = errors.filter(error => error.property === 'timeValue');
      expect(timeErrors).toHaveLength(1);
    });

    it('should reject minute 99', async () => {
      const testInstance = new TestTimeClass();
      testInstance.timeValue = '12:99';

      const errors = await validate(testInstance);
      const timeErrors = errors.filter(error => error.property === 'timeValue');
      expect(timeErrors).toHaveLength(1);
    });

    it('should reject single digit minute without leading zero', async () => {
      const testInstance = new TestTimeClass();
      testInstance.timeValue = '12:5';

      const errors = await validate(testInstance);
      const timeErrors = errors.filter(error => error.property === 'timeValue');
      expect(timeErrors).toHaveLength(1);
    });

    it('should reject negative minute', async () => {
      const testInstance = new TestTimeClass();
      testInstance.timeValue = '12:-5';

      const errors = await validate(testInstance);
      const timeErrors = errors.filter(error => error.property === 'timeValue');
      expect(timeErrors).toHaveLength(1);
    });

    it('should reject three digit minute', async () => {
      const testInstance = new TestTimeClass();
      testInstance.timeValue = '12:123';

      const errors = await validate(testInstance);
      const timeErrors = errors.filter(error => error.property === 'timeValue');
      expect(timeErrors).toHaveLength(1);
    });
  });

  describe('Invalid time formats - Format validation', () => {
    it('should reject time without colon separator', async () => {
      const testInstance = new TestTimeClass();
      testInstance.timeValue = '1200';

      const errors = await validate(testInstance);
      const timeErrors = errors.filter(error => error.property === 'timeValue');
      expect(timeErrors).toHaveLength(1);
    });

    it('should reject time with wrong separator (dot)', async () => {
      const testInstance = new TestTimeClass();
      testInstance.timeValue = '12.00';

      const errors = await validate(testInstance);
      const timeErrors = errors.filter(error => error.property === 'timeValue');
      expect(timeErrors).toHaveLength(1);
    });

    it('should reject time with wrong separator (slash)', async () => {
      const testInstance = new TestTimeClass();
      testInstance.timeValue = '12/00';

      const errors = await validate(testInstance);
      const timeErrors = errors.filter(error => error.property === 'timeValue');
      expect(timeErrors).toHaveLength(1);
    });

    it('should reject time with multiple colons', async () => {
      const testInstance = new TestTimeClass();
      testInstance.timeValue = '12:00:00';

      const errors = await validate(testInstance);
      const timeErrors = errors.filter(error => error.property === 'timeValue');
      expect(timeErrors).toHaveLength(1);
    });

    it('should reject time with letters', async () => {
      const testInstance = new TestTimeClass();
      testInstance.timeValue = '12:3a';

      const errors = await validate(testInstance);
      const timeErrors = errors.filter(error => error.property === 'timeValue');
      expect(timeErrors).toHaveLength(1);
    });

    it('should reject time with special characters', async () => {
      const testInstance = new TestTimeClass();
      testInstance.timeValue = '12:@0';

      const errors = await validate(testInstance);
      const timeErrors = errors.filter(error => error.property === 'timeValue');
      expect(timeErrors).toHaveLength(1);
    });

    it('should reject empty string', async () => {
      const testInstance = new TestTimeClass();
      testInstance.timeValue = '';

      const errors = await validate(testInstance);
      const timeErrors = errors.filter(error => error.property === 'timeValue');
      expect(timeErrors).toHaveLength(1);
    });

    it('should reject whitespace', async () => {
      const testInstance = new TestTimeClass();
      testInstance.timeValue = '   ';

      const errors = await validate(testInstance);
      const timeErrors = errors.filter(error => error.property === 'timeValue');
      expect(timeErrors).toHaveLength(1);
    });

    it('should reject time with leading/trailing spaces', async () => {
      const testInstance = new TestTimeClass();
      testInstance.timeValue = ' 12:00 ';

      const errors = await validate(testInstance);
      const timeErrors = errors.filter(error => error.property === 'timeValue');
      expect(timeErrors).toHaveLength(1);
    });
  });

  describe('Null and undefined values', () => {
    it('should reject null value', async () => {
      const testInstance = new TestTimeClass();
      testInstance.timeValue = null as any;

      const errors = await validate(testInstance);
      const timeErrors = errors.filter(error => error.property === 'timeValue');
      expect(timeErrors).toHaveLength(1);
    });

    it('should reject undefined value', async () => {
      const testInstance = new TestTimeClass();
      testInstance.timeValue = undefined as any;

      const errors = await validate(testInstance);
      const timeErrors = errors.filter(error => error.property === 'timeValue');
      expect(timeErrors).toHaveLength(1);
    });
  });

  describe('Non-string values', () => {
    it('should reject number value', async () => {
      const testInstance = new TestTimeClass();
      testInstance.timeValue = 1200 as any;

      const errors = await validate(testInstance);
      const timeErrors = errors.filter(error => error.property === 'timeValue');
      expect(timeErrors).toHaveLength(1);
    });

    it('should reject boolean value', async () => {
      const testInstance = new TestTimeClass();
      testInstance.timeValue = true as any;

      const errors = await validate(testInstance);
      const timeErrors = errors.filter(error => error.property === 'timeValue');
      expect(timeErrors).toHaveLength(1);
    });

    it('should reject object value', async () => {
      const testInstance = new TestTimeClass();
      testInstance.timeValue = { hour: 12, minute: 0 } as any;

      const errors = await validate(testInstance);
      const timeErrors = errors.filter(error => error.property === 'timeValue');
      expect(timeErrors).toHaveLength(1);
    });

    it('should reject array value', async () => {
      const testInstance = new TestTimeClass();
      testInstance.timeValue = [12, 0] as any;

      const errors = await validate(testInstance);
      const timeErrors = errors.filter(error => error.property === 'timeValue');
      expect(timeErrors).toHaveLength(1);
    });
  });

  describe('Custom error messages', () => {
    it('should use custom error message when provided', async () => {
      const testInstance = new TestTimeClass();
      testInstance.customMessageTime = 'invalid-time';

      const errors = await validate(testInstance);
      const timeErrors = errors.filter(error => error.property === 'customMessageTime');
      expect(timeErrors).toHaveLength(1);
      expect(timeErrors[0].constraints).toEqual(
        expect.objectContaining({
          isTime: 'Custom time error message',
        }),
      );
    });

    it('should use default error message when no custom message provided', async () => {
      const testInstance = new TestTimeClass();
      testInstance.timeValue = 'invalid-time';

      const errors = await validate(testInstance);
      const timeErrors = errors.filter(error => error.property === 'timeValue');
      expect(timeErrors).toHaveLength(1);
      expect(timeErrors[0].constraints).toHaveProperty('isTime');
    });
  });

  describe('Edge cases', () => {
    it('should validate all possible valid times in a day', async () => {
      const validTimes: string[] = [];

      // Generate all valid times
      for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute++) {
          const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          validTimes.push(timeString);
        }
      }

      // Test a sample of valid times (testing all 1440 would be excessive)
      const sampleTimes = validTimes.filter((_, index) => index % 60 === 0); // Every hour

      for (const time of sampleTimes) {
        const testInstance = new TestTimeClass();
        testInstance.timeValue = time;

        const errors = await validate(testInstance);
        const timeErrors = errors.filter(error => error.property === 'timeValue');
        expect(timeErrors).toHaveLength(0);
      }
    });

    it('should reject 12-hour format times (AM/PM)', async () => {
      const invalidTimes = [
        '12:00 AM',
        '12:00 PM',
        '01:30 am',
        '11:59 pm',
        '12:00AM',
        '12:00PM',
      ];

      for (const time of invalidTimes) {
        const testInstance = new TestTimeClass();
        testInstance.timeValue = time;

        const errors = await validate(testInstance);
        const timeErrors = errors.filter(error => error.property === 'timeValue');
        expect(timeErrors).toHaveLength(1);
      }
    });

    it('should reject times with seconds', async () => {
      const timesWithSeconds = [
        '12:00:00',
        '09:30:45',
        '23:59:59',
      ];

      for (const time of timesWithSeconds) {
        const testInstance = new TestTimeClass();
        testInstance.timeValue = time;

        const errors = await validate(testInstance);
        const timeErrors = errors.filter(error => error.property === 'timeValue');
        expect(timeErrors).toHaveLength(1);
      }
    });
  });
});