import chai from 'chai';
import dirtyChai from 'dirty-chai';
import sinonChai from 'sinon-chai';

chai.use(dirtyChai);
chai.use(sinonChai);

// throw errors to fail the build
console.error = msg => { throw new Error(msg); }; // eslint-disable-line no-console

const testsContext = require.context('../..', true, /^\.\/(src|lib).*\.spec.js$/);
testsContext.keys().forEach(testsContext);
