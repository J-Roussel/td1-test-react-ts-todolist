import renderer from "react-test-renderer";
import Card from "./Card";


describe('test Card componenet', () => {
    let id = 'test';
    let titre = 'test';
    let children = <div>test</div>
    it('renders the Card component', () => {
        const CARDCOMPONENT = renderer.create(<Card id={id} titre={titre} children={children}/>);
        let instance = CARDCOMPONENT.toJSON();
        expect(instance).toMatchSnapshot();
    })
})