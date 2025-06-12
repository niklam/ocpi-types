import { OcpiResponseBuilder } from './ocpi-response.builder';
import { OcpiStatusCode } from '../enums/status-codes.enum';
import { OcpiErrorResponse, OcpiResponse } from '../dtos/ocpi-response.dto';

describe('OcpiResponseBuilder', () => {
  // Mock Date to have predictable timestamps in tests
  const mockDate = new Date('2023-12-01T10:00:00.000Z');
  const mockISOString = mockDate.toISOString();

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(mockDate);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('success', () => {
    it('should create a successful response with data and default message', () => {
      const testData = { id: 1, name: 'Test' };

      const result = OcpiResponseBuilder.success(testData);

      expect(result).toEqual({
        data: testData,
        status_code: OcpiStatusCode.SUCCESS_GENERIC,
        status_message: undefined,
        timestamp: mockISOString,
      });
    });

    it('should create a successful response with data and custom message', () => {
      const testData = { id: 1, name: 'Test' };
      const customMessage = 'Operation completed successfully';

      const result = OcpiResponseBuilder.success(testData, customMessage);

      expect(result).toEqual({
        data: testData,
        status_code: OcpiStatusCode.SUCCESS_GENERIC,
        status_message: customMessage,
        timestamp: mockISOString,
      });
    });

    it('should handle different data types', () => {
      // Test with string
      const stringResult = OcpiResponseBuilder.success('test string');
      expect(stringResult.data).toBe('test string');

      // Test with number
      const numberResult = OcpiResponseBuilder.success(42);
      expect(numberResult.data).toBe(42);

      // Test with array
      const arrayData = [1, 2, 3];
      const arrayResult = OcpiResponseBuilder.success(arrayData);
      expect(arrayResult.data).toEqual(arrayData);

      // Test with null
      const nullResult = OcpiResponseBuilder.success(null);
      expect(nullResult.data).toBeNull();
    });

    it('should have correct TypeScript typing', () => {
      const stringData = 'test';
      const result: OcpiResponse<string> = OcpiResponseBuilder.success(stringData);

      // This test verifies TypeScript compilation - if it compiles, the typing is correct
      expect(result.data).toBe(stringData);
    });

    it('should generate current timestamp', () => {
      // Test with real timers to verify actual timestamp generation
      jest.useRealTimers();

      const beforeCall = new Date().toISOString();
      const result = OcpiResponseBuilder.success({ test: 'data' });
      const afterCall = new Date().toISOString();

      expect(result.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
      expect(result.timestamp >= beforeCall).toBe(true);
      expect(result.timestamp <= afterCall).toBe(true);

      // Restore fake timers for other tests
      jest.useFakeTimers();
      jest.setSystemTime(mockDate);
    });
  });

  describe('successEmpty', () => {
    it('should create a successful empty response without message', () => {
      const result = OcpiResponseBuilder.successEmpty();

      expect(result).toEqual({
        status_code: OcpiStatusCode.SUCCESS_GENERIC,
        status_message: undefined,
        timestamp: mockISOString,
      });
    });

    it('should create a successful empty response with custom message', () => {
      const customMessage = 'Empty response with message';

      const result = OcpiResponseBuilder.successEmpty(customMessage);

      expect(result).toEqual({
        status_code: OcpiStatusCode.SUCCESS_GENERIC,
        status_message: customMessage,
        timestamp: mockISOString,
      });
    });

    it('should not have data property', () => {
      const result = OcpiResponseBuilder.successEmpty();

      expect(result).not.toHaveProperty('data');
    });

    it('should return OcpiErrorResponse type', () => {
      const result: OcpiErrorResponse = OcpiResponseBuilder.successEmpty();

      // This test verifies TypeScript compilation - if it compiles, the typing is correct
      expect(result.status_code).toBe(OcpiStatusCode.SUCCESS_GENERIC);
    });
  });

  describe('error', () => {
    it('should create an error response with status code and no message', () => {
      const statusCode = OcpiStatusCode.SERVER_ERROR_GENERIC;

      const result = OcpiResponseBuilder.error(statusCode);

      expect(result).toEqual({
        status_code: statusCode,
        status_message: undefined,
        timestamp: mockISOString,
      });
    });

    it('should create an error response with status code and custom message', () => {
      const statusCode = OcpiStatusCode.SERVER_ERROR_GENERIC;
      const errorMessage = 'Resource not found';

      const result = OcpiResponseBuilder.error(statusCode, errorMessage);

      expect(result).toEqual({
        status_code: statusCode,
        status_message: errorMessage,
        timestamp: mockISOString,
      });
    });

    it('should handle different OCPI status codes', () => {
      const testCases = [
        { code: OcpiStatusCode.CLIENT_ERROR_GENERIC, description: 'Generic client error' },
        { code: OcpiStatusCode.CLIENT_ERROR_INVALID_OR_MISSING_PARAMETERS, description: 'Invalid parameters' },
        { code: OcpiStatusCode.CLIENT_ERROR_NOT_ENOUGH_INFORMATION, description: 'Not enough information' },
        { code: OcpiStatusCode.CLIENT_ERROR_UNKNOWN_LOCATION, description: 'Unknown location' },
        { code: OcpiStatusCode.CLIENT_ERROR_UNKNOWN_TOKEN, description: 'Unknown token' },
        { code: OcpiStatusCode.SERVER_ERROR_GENERIC, description: 'Generic server error' },
        { code: OcpiStatusCode.SERVER_ERROR_UNABLE_TO_USE_CLIENT_API, description: 'Unable to use client API' },
        { code: OcpiStatusCode.SERVER_ERROR_UNSUPPORTED_VERSION, description: 'Unsupported version' },
        { code: OcpiStatusCode.SERVER_ERROR_NO_MATCHING_ENDPOINTS, description: 'No matching endpoints' },
        { code: OcpiStatusCode.HUB_ERROR_GENERIC, description: 'Generic hub error' },
        { code: OcpiStatusCode.HUB_ERROR_UNKNOWN_RECEIVER, description: 'Unknown receiver' },
        { code: OcpiStatusCode.HUB_ERROR_REQUEST_TIMEOUT, description: 'Request timeout' },
        { code: OcpiStatusCode.HUB_ERROR_CONNECTION_PROBLEM, description: 'Connection problem' },
      ];

      testCases.forEach(({ code, description }) => {
        const result = OcpiResponseBuilder.error(code, description);

        expect(result.status_code).toBe(code);
        expect(result.status_message).toBe(description);
      });
    });

    it('should handle numeric status codes directly', () => {
      // Test with raw numeric values that match OCPI codes
      const result1 = OcpiResponseBuilder.error(2001, 'Invalid parameters');
      const result2 = OcpiResponseBuilder.error(3000, 'Server error');

      expect(result1.status_code).toBe(2001);
      expect(result2.status_code).toBe(3000);
    });

    it('should not have data property', () => {
      const result = OcpiResponseBuilder.error(OcpiStatusCode.SERVER_ERROR_GENERIC, 'Bad request');

      expect(result).not.toHaveProperty('data');
    });

    it('should return OcpiErrorResponse type', () => {
      const result: OcpiErrorResponse = OcpiResponseBuilder.error(OcpiStatusCode.SERVER_ERROR_GENERIC);

      // This test verifies TypeScript compilation - if it compiles, the typing is correct
      expect(result.status_code).toBe(3000);
    });
  });

  describe('OCPI Status Code Integration', () => {
    it('should use SUCCESS_GENERIC for successful responses', () => {
      const successResult = OcpiResponseBuilder.success({ data: 'test' });
      const emptyResult = OcpiResponseBuilder.successEmpty();

      expect(successResult.status_code).toBe(OcpiStatusCode.SUCCESS_GENERIC);
      expect(successResult.status_code).toBe(1000);
      expect(emptyResult.status_code).toBe(OcpiStatusCode.SUCCESS_GENERIC);
      expect(emptyResult.status_code).toBe(1000);
    });

    it('should accept all valid OCPI error status codes', () => {
      // Test client error codes (2xxx)
      expect(() => OcpiResponseBuilder.error(OcpiStatusCode.CLIENT_ERROR_GENERIC)).not.toThrow();
      expect(() => OcpiResponseBuilder.error(OcpiStatusCode.CLIENT_ERROR_INVALID_OR_MISSING_PARAMETERS)).not.toThrow();
      expect(() => OcpiResponseBuilder.error(OcpiStatusCode.CLIENT_ERROR_NOT_ENOUGH_INFORMATION)).not.toThrow();
      expect(() => OcpiResponseBuilder.error(OcpiStatusCode.CLIENT_ERROR_UNKNOWN_LOCATION)).not.toThrow();
      expect(() => OcpiResponseBuilder.error(OcpiStatusCode.CLIENT_ERROR_UNKNOWN_TOKEN)).not.toThrow();

      // Test server error codes (3xxx)
      expect(() => OcpiResponseBuilder.error(OcpiStatusCode.SERVER_ERROR_GENERIC)).not.toThrow();
      expect(() => OcpiResponseBuilder.error(OcpiStatusCode.SERVER_ERROR_UNABLE_TO_USE_CLIENT_API)).not.toThrow();
      expect(() => OcpiResponseBuilder.error(OcpiStatusCode.SERVER_ERROR_UNSUPPORTED_VERSION)).not.toThrow();
      expect(() => OcpiResponseBuilder.error(OcpiStatusCode.SERVER_ERROR_NO_MATCHING_ENDPOINTS)).not.toThrow();

      // Test hub error codes (4xxx)
      expect(() => OcpiResponseBuilder.error(OcpiStatusCode.HUB_ERROR_GENERIC)).not.toThrow();
      expect(() => OcpiResponseBuilder.error(OcpiStatusCode.HUB_ERROR_UNKNOWN_RECEIVER)).not.toThrow();
      expect(() => OcpiResponseBuilder.error(OcpiStatusCode.HUB_ERROR_REQUEST_TIMEOUT)).not.toThrow();
      expect(() => OcpiResponseBuilder.error(OcpiStatusCode.HUB_ERROR_CONNECTION_PROBLEM)).not.toThrow();
    });

    it('should create semantically correct error responses', () => {
      // Test typical OCPI error scenarios
      const invalidParamsError = OcpiResponseBuilder.error(
        OcpiStatusCode.CLIENT_ERROR_INVALID_OR_MISSING_PARAMETERS,
        'Required field "connector_id" is missing',
      );
      expect(invalidParamsError.status_code).toBe(2001);

      const unknownTokenError = OcpiResponseBuilder.error(
        OcpiStatusCode.CLIENT_ERROR_UNKNOWN_TOKEN,
        'Token not found in database',
      );
      expect(unknownTokenError.status_code).toBe(2004);

      const serverError = OcpiResponseBuilder.error(OcpiStatusCode.SERVER_ERROR_GENERIC, 'Database connection failed');
      expect(serverError.status_code).toBe(3000);
    });
  });

  describe('timestamp consistency', () => {
    it('should generate the same timestamp for calls made at the same time', () => {
      const result1 = OcpiResponseBuilder.success({ test: 1 });
      const result2 = OcpiResponseBuilder.successEmpty();
      const result3 = OcpiResponseBuilder.error(400);

      expect(result1.timestamp).toBe(mockISOString);
      expect(result2.timestamp).toBe(mockISOString);
      expect(result3.timestamp).toBe(mockISOString);
    });

    it('should generate ISO 8601 formatted timestamps', () => {
      const result = OcpiResponseBuilder.success({ test: 'data' });

      // Verify ISO 8601 format: YYYY-MM-DDTHH:mm:ss.sssZ
      expect(result.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);

      // Verify it's a valid date
      expect(new Date(result.timestamp).toISOString()).toBe(result.timestamp);
    });
  });

  describe('edge cases', () => {
    it('should handle empty string messages', () => {
      const successResult = OcpiResponseBuilder.success({ data: 'test' }, '');
      const emptyResult = OcpiResponseBuilder.successEmpty('');
      const errorResult = OcpiResponseBuilder.error(OcpiStatusCode.SERVER_ERROR_GENERIC, '');

      expect(successResult.status_message).toBe('');
      expect(emptyResult.status_message).toBe('');
      expect(errorResult.status_message).toBe('');
    });

    it('should handle very long messages', () => {
      const longMessage = 'A'.repeat(1000);

      const result = OcpiResponseBuilder.error(OcpiStatusCode.SERVER_ERROR_GENERIC, longMessage);

      expect(result.status_message).toBe(longMessage);
      expect(result.status_message?.length).toBe(1000);
    });

    it('should handle special characters in messages', () => {
      const specialMessage = '特殊字符 🚗 & < > " \' \n \t';

      const result = OcpiResponseBuilder.success({ test: true }, specialMessage);

      expect(result.status_message).toBe(specialMessage);
    });

    it('should handle zero as status code', () => {
      const result = OcpiResponseBuilder.error(0, 'Zero status code');

      expect(result.status_code).toBe(0);
    });

    it('should handle negative status codes', () => {
      const result = OcpiResponseBuilder.error(-1, 'Negative status code');

      expect(result.status_code).toBe(-1);
    });
  });
});
