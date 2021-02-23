import { createMachine, actions, spawn } from 'xstate';
import {
  useMachine,
  useActor,
  useSelector,
  useInterpret,
  useService,
} from '@xstate/react';
const { assign, log } = actions;

const exampleOneMachine = createMachine({
  initial: 'idle',
  context: {
    age: 30,
    name: 'Andy',
    occupation: 'Unknown',
    veggies: ['carrot', 'beet', 'broccoli', 'cauliflower'],
  },
  states: {
    idle: {},
  },
  on: {
    TEST: {
      actions: log('TEST event received'),
    },
    TEST_TWO: {
      actions: log('TEST_TWO event received'),
    },
    INCREMENT_AGE: {
      actions: assign({
        age: (context) => context.age + 1,
      }),
    },
    CHANGE_NAME: {
      actions: assign({
        name: 'Tomek',
      }),
    },
  },
});

const exampleTwoMachine = createMachine({
  initial: 'idle',
  context: {
    age: 30,
    name: 'Andy',
    occupation: 'Unknown',
    veggies: ['carrot', 'beet', 'broccoli', 'cauliflower'],
  },
  states: {
    idle: {},
  },
  on: {
    TEST: {
      actions: log('TEST event received'),
    },
    TEST_TWO: {
      actions: log('TEST_TWO event received'),
    },
    INCREMENT_AGE: {
      actions: assign({
        age: (context) => context.age + 1,
      }),
    },
    CHANGE_NAME: {
      actions: assign({
        name: 'Tomek',
      }),
    },
  },
});

// const Name = function Name() {};

window.states = [];
window.sends = [];
window.services = [];
window.counter = 0;

const Veggie = function Veggie({ name }) {
  console.log('Veggie()');
  return <div>{name}</div>;
};

const selectContext = function selectContext(state) {
  return state.context;
};

const selectAge = function selectContext(state) {
  return state.context.age;
};

const VeggieStuff = function VeggieStuff({ service }) {};

const ExampleOne = function ExampleOne() {
  const service = useInterpret(exampleOneMachine);
  const age = useSelector(service, selectAge);
  return (
    <div>
      <div>Age: {age}</div>
      <button onClick={() => service.send({ type: 'TEST' })}>TEST</button>
      <button onClick={() => service.send({ type: 'TEST_TWO' })}>
        TEST_TWO
      </button>
      <button onClick={() => service.send({ type: 'INCREMENT_AGE' })}>
        INCREMENT_AGE
      </button>
      <button onClick={() => service.send({ type: 'CHANGE_NAME' })}>
        CHANGE_NAME
      </button>
    </div>
  );
};

const ExampleTwo = function ExampleTwo() {
  const service = useInterpret(exampleTwoMachine);
  // const context = useSelector(service, selectContext);
  const age = useSelector(service, selectAge);
  // const [state, send] = useService(service);
  // const [state, send, service] = useMachine(appMachine);
  // window.states.push(state);
  // window.sends.push(send);
  // window.services.push(service);

  // const elsVeggies = state.context.veggies.map((name, i) => (
  //   <Veggie key={`veggie-${i}`} name={name} />
  // ));

  return (
    <div>
      <div>Age: {age}</div>
      {/* <div>Name: {state.context.name}</div> */}
      {/* <div>Occupation: {state.context.occupation}</div> */}
      {/* {elsVeggies} */}
      <button onClick={() => service.send({ type: 'TEST' })}>TEST</button>
      <button onClick={() => service.send({ type: 'TEST_TWO' })}>
        TEST_TWO
      </button>
      <button onClick={() => service.send({ type: 'INCREMENT_AGE' })}>
        INCREMENT_AGE
      </button>
      <button onClick={() => service.send({ type: 'CHANGE_NAME' })}>
        CHANGE_NAME
      </button>
      {/* <button onClick={() => send({ type: 'TEST' })}>TEST</button>
      <button onClick={() => send({ type: 'TEST_TWO' })}>TEST_TWO</button> */}
      {/* <button onClick={() => (window.counter += 1)}>window.counter += 1</button> */}
    </div>
  );
};

const App = function App() {
  return <ExampleTwo />;
};

export default App;
