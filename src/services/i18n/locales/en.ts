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
      fields: {
        email: 'Enter email',
        password: 'Enter password',
        confirmPassword: 'Confirm password',
      },
      buttons: {
        cancel: 'Cancel',
        submit: 'Submit',
        ok: 'Ok',
      },
      successfulRegistration: {
        title: 'Successful registration',
        message: 'Please check your inbox and confirm email',
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
        copyWs: 'Copy WS',
        copyHttp: 'Copy HTTP',
        repo: 'Repo',
      },
    },
  },
};

export { en };
