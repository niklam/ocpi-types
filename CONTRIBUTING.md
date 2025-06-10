# Contributing to ocpi-types

Thank you for your interest in contributing to ocpi-types! This library provides TypeScript DTOs and enums for the OCPI 2.2.1 specification, helping developers build type-safe EV charging applications. We welcome contributions from everyone and appreciate your help in making this project better.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Reporting Issues](#reporting-issues)
- [Questions and Support](#questions-and-support)

## Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the maintainers through GitHub issues.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Set up the development environment (see [Development Setup](#development-setup))
4. Create a new branch for your feature or bug fix
5. Make your changes
6. Test your changes
7. Submit a pull request

## How to Contribute

### Types of Contributions

We welcome several types of contributions:

- **OCPI specification updates**: Help implement new OCPI versions or missing features
- **Bug fixes**: Fix issues with existing DTOs, enums, or validation decorators
- **Type improvements**: Enhance TypeScript types for better developer experience
- **Validation enhancements**: Improve class-validator decorators and custom validators
- **Documentation**: Improve README, JSDoc comments, or add usage examples
- **Testing**: Write tests to improve code coverage for DTOs and validators
- **Performance optimizations**: Improve library performance and bundle size

### Before You Start

- Check existing issues and pull requests to avoid duplicating work
- For major changes, please open an issue first to discuss your proposed changes
- Make sure your contribution aligns with the project's goals and scope

## Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn package manager
- TypeScript knowledge
- Familiarity with class-validator and class-transformer
- Basic understanding of the OCPI specification

### Installation

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/ocpi-types.git
cd ocpi-types

# Install dependencies
npm install

# Install peer dependencies for development
npm install class-validator class-transformer reflect-metadata

# Build the project
npm run build
```

### Running the Project

```bash
# Build the library
npm run build

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run linting
npm run lint

# Type checking
npm run type-check
```

## Pull Request Process

1. **Create a branch**: Use a descriptive name like `feature/add-hubclientinfo-dto` or `fix/tariff-validation`

2. **Make your changes**:
   - Write clear, concise commit messages
   - Keep commits focused and atomic
   - Follow the coding standards

3. **Test your changes**:
   - Run the existing test suite (`npm test`)
   - Add tests for new DTOs, enums, or validators
   - Test with different TypeScript configurations
   - Verify class-validator and class-transformer compatibility
   - Ensure all tests pass

4. **Update documentation**:
   - Update JSDoc comments for new/modified DTOs
   - Update README.md if adding new modules or features
   - Add usage examples if appropriate

5. **Submit the pull request**:
   - Use a clear, descriptive title
   - Fill out the pull request template
   - Reference any related issues

6. **Code review**: Be responsive to feedback and make requested changes

7. **Merge**: Once approved, your PR will be merged by a maintainer

### Pull Request Template

When creating a pull request, please include:

- **Description**: What does this PR do? (e.g., "Adds CDR module DTOs", "Fixes validation for LocationDto")
- **OCPI Compliance**: Reference specific OCPI 2.2.1 specification sections
- **Related Issues**: Link to any related GitHub issues
- **Type of Change**: New DTO/enum, bug fix, validation improvement, etc.
- **Breaking Changes**: List any breaking changes and migration guide
- **Testing**: How has this been tested? Include test cases for new DTOs

## Coding Standards

### General Guidelines

- Write clean, readable, and maintainable code
- Follow the existing code style and conventions
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused
- All DTO properties that are snake_case in the OCPI specification must be presented in camelCase with appropriate `@Expose()` decorators for JSON transformation

### TypeScript Guidelines

- Use strict TypeScript settings
- Prefer interfaces for public APIs, types for internal use
- Export types and DTOs from appropriate module entry points
- Use proper JSDoc comments with `@example` tags
- Follow OCPI naming conventions (snake_case for properties matching spec)

### DTO Guidelines

- Extend base DTOs when appropriate
- Use class-validator decorators for validation
- Use class-transformer decorators for JSON mapping
- Include proper `@Type()` decorators for nested objects
- Implement OCPI-specific validation rules

### Validation Guidelines

- Use existing OCPI validation decorators when possible
- Create custom validators for OCPI-specific formats
- Provide clear error messages
- Test edge cases and invalid inputs

### Enum Guidelines

- Use string enums matching OCPI specification values
- Include JSDoc comments explaining enum usage
- Export from appropriate modules

### Commit Messages

Follow the conventional commit format:

```
type(scope): brief description

Detailed description if necessary

Fixes #123
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:
- `feat(locations): add new connector types from OCPI spec`
- `fix(tariffs): correct validation for price components`
- `docs(readme): update usage examples for sessions module`

## Testing

- Write tests for all new DTOs and enums
- Test validation decorators with valid and invalid data
- Test with class-validator and class-transformer
- Test TypeScript compilation and type inference
- Ensure good test coverage for new functionality

### Test Structure

- Unit tests for DTOs: place next to the code (e.g., `src/locations/location.dto.spec.ts`)
- Custom validator tests: place next to the validators (e.g., `src/validators/ocpi-datetime.validator.spec.ts`)

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- path/to/test.js
```

## Reporting Issues

When reporting bugs or requesting features:

1. **Search existing issues** first to avoid duplicates
2. **Use issue templates** if provided
3. **Be specific and detailed** in your description
4. **Include reproduction steps** for bugs
5. **Add relevant labels** if you have permission

### Bug Reports Should Include

- Clear description of the issue with the DTO or validation
- OCPI specification reference (section/page)
- Code example demonstrating the issue
- Expected vs actual behavior
- TypeScript version and configuration
- class-validator/class-transformer versions
- Error messages or validation failures

### Feature Requests Should Include

- OCPI specification reference for new features
- Clear description of the missing DTO/enum/validation
- Use case and motivation
- Example of expected API
- Any breaking changes that might be required

## Questions and Support

- **General questions**: Use GitHub Discussions
- **Bug reports**: Create an issue with the bug template
- **OCPI specification questions**: Reference the [OCPI Forum](https://ocpi-forum.org/)
- **TypeScript/validation help**: Check existing issues or create a new one

## Recognition

Contributors who make significant contributions will be:

- Added to the CONTRIBUTORS.md file
- Mentioned in release notes
- Given appropriate credit in documentation

## License

By contributing, you agree that your contributions will be licensed under the same MIT License as the project (see LICENSE file).

## OCPI Specification

This library implements the OCPI 2.2.1 specification. When contributing:

- Reference the [official OCPI specification](https://github.com/ocpi/ocpi)
- Ensure new features align with the specification
- Include specification section references in PRs
- Consider forward compatibility with future OCPI versions

---

Thank you for contributing to ocpi-types! 🚗⚡

Made with ❤️ for the EV charging community