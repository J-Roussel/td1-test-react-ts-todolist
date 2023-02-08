import React from "react";
import renderer from "react-test-renderer";
import Form from "./Form";

describe('Unit test for Form component', () => {
    test('render form component correctly', () => {
        const FORMCOMPONENT = renderer.create(<Form valueName="test" 
                                                    valueDescri="teste" 
                                                    initialValue={["test1", "test2"]} 
                                                    handleChange={jest.fn()} 
                                                    addTask={jest.fn()}
                                              />);
        let tree = FORMCOMPONENT.toJSON();
        expect(tree).toMatchSnapshot();

    });

    test('test input', () => {
      const handleChange = jest.fn();
      const FORMCOMPONENT = renderer.create(<Form valueName="test" 
                                                  valueDescri="teste" 
                                                  initialValue={["test1", "test2"]} 
                                                  handleChange={handleChange} 
                                                  addTask={jest.fn()}
                                            />);
      let instance = FORMCOMPONENT.root;
      let tree = instance.findAllByType('input')[0];
      tree.props.onChange({ target: { name: 'inputName', value: 'Test task' } });
      expect(handleChange).toHaveBeenCalledWith({ target: { name: 'inputName', value: 'Test task' } });

    })

    
 



})

