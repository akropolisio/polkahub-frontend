// tslint:disable:max-line-length
const en = {
  app: {
    mainTitle: 'Polkahub',
    pages: {},
  },
  features: {
    auth: {
      logout: 'Logout',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      resetPassword: 'Reset password',
      changePassword: 'Change password',
      fields: {
        code: 'Enter code from inbox',
        email: 'Enter email',
        password: 'Enter password',
        confirmPassword: 'Confirm password',
      },
      buttons: {
        cancel: 'Cancel',
        submit: 'Submit',
        ok: 'Ok',
        resendCode: 'Resend code',
        forgotPassword: 'Forgot password',
      },
      successfulRegistration: {
        title: 'Successful registration',
        message: 'Please check your inbox and confirm email',
      },
      successfulPasswordChanging: {
        title: 'Password change Successful',
        message: 'You can log in using the new password.',
      },
      errors: {
        'account not found, please registered and auth first':
          'A user with this email and password was not found. Please check the entered email and password, or go through the registration procedure.',
      },
    },
    editProject: {
      formTitle: 'Edit project %{name}',
      fields: {
        description: 'Enter description',
      },
      buttons: {
        edit: 'Edit',
        cancel: 'Cancel',
        submit: 'Submit',
      },
    },
  },
  utils: {
    validation: {
      isRequired: 'Field is required',
      moreThen: 'Should be more then %{value}',
      moreThenOrEqual: 'Should be more then or equal %{value}',
      lessThenOrEqual: 'Should be less then or equal %{value}',
      notDefault: 'Value must be different from initial',
      maxStringLength: 'Text should be less then %{max} letters',
      onEnglishPlease: 'Should contain only english letters, numbers and ",.!:\'""',
      isNumber: 'Enter a valid number',
      decimalsMoreThen: 'Enter a valid number with decimals less than %{decimals} digits',
      mustBeAnInteger: 'Enter an integer',
      isPositiveNumber: 'Must be positive number',
      isMatchPassword: 'Passwords do not match. Try again.',
    },
  },
  components: {
    pagination: {
      itemsPerPage: 'Items per page',
      currentPagination: '%{from} - %{to} of %{total}',
      currentSubgraphPagination: '%{from} - %{to}',
    },
    activitiesCard: {
      expansionPanelTitle: 'Description',
    },
    nodeCard: {
      name: 'Name',
      version: 'Version',
      updatedAt: 'Updated at',
      createdAt: 'Created at',
      owner: 'Owner',
      buttons: {
        copyWs: 'WS',
        copyHttp: 'HTTP',
        repo: 'Repo',
      },
    },
  },
};

export { en };
