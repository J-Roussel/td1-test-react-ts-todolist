import renderer from "react-test-renderer";
import App from './App';
import Form from './components/form/Form';
import Card  from './components/card/Card';


describe('Unit test for App component', () => {
  test('renders app component correctly', () => {
    const APPCOMPONENT = renderer.create(<App/>);
    let tree = APPCOMPONENT.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('render the correct title and subtitle', ()=>{
    const APPCOMPONENT = renderer.create(<App/>);
    const TEXTELEMENT = APPCOMPONENT.root.findByType("h1").children;
    
    console.log(TEXTELEMENT.toString());
    
    expect(TEXTELEMENT.toString()).toMatch(/ToDo List React Typescript/i);
  });

  test('all components renders normally', () => {
    const APPCOMPONENT = renderer.create(<App/>);
    const TEXTELEMENT = APPCOMPONENT.root;

    let formComponent = TEXTELEMENT.findByType(Form);
    expect(formComponent).toBeDefined();

    let cardComponent = TEXTELEMENT.findAllByType(Card);
    console.log(cardComponent);
    
    expect(cardComponent.length).toBe(2);

  });


})
