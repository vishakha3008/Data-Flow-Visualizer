import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PopUp.css';

const PopUp = ({ nodeData, onClose }) => {
  const [formFields, setFormFields] = useState([]);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/flows/getMeta/${nodeData.id}`);

        
        setFormFields(response.data.formFields || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [nodeData.id]); 
  const handleAddField = () => {
    const newField = { id: formFields.length + 1, values: ['', ''] };
    setFormFields([...formFields, newField]);
  };
  const handleRemoveField = async (fieldId) => {
    
    try {
      await axios.delete(`http://localhost:9000/flows/deleteMeta/${nodeData.id}/${fieldId}`);
      
      const updatedFields = formFields.filter((field) => field.id !== fieldId);
      setFormFields(updatedFields);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  const handleChangeField = (fieldId, columnIndex, value) => {
    const updatedFields = formFields.map((field) => {
      if (field.id === fieldId) {
        const updatedValues = [...field.values];
        updatedValues[columnIndex] = value;
        return { ...field, values: updatedValues };
      }
      return field;
    });
    setFormFields(updatedFields);
  };
  const handleSave = async () => {
    try {
      
      const dataToSave = {
        nodeId: nodeData.id,
        formFields: formFields,
      };

      
      const response = await axios.patch(`http://localhost:9000/flows/patchMeta/${nodeData.id}`, dataToSave);

     
      console.log('Save successful:', response.data);

      
    } catch (error) {
     
      console.error('Error saving data:', error);
    }
  };
  return (
    <div className="popup-overlay">
      <div className="popup-content">
      <div className='box'>
      <h4>NODE METADATA</h4>
      {formFields.map((field) => (
        <div key={field.id} className="form-row">
              <input
                type="text"
                placeholder='Attribute'
                value={field.values[0]}
                onChange={(e) => handleChangeField(field.id, 0, e.target.value)}
              />
              <input
                type="text"
                placeholder='Value'
                value={field.values[1]}
                onChange={(e) => handleChangeField(field.id, 1, e.target.value)}
              />
              <button className='X' onClick={() => handleRemoveField(field.id)}>X</button>
          </div>
        ))}
        </div>
        <div className='operations'>
        <button onClick={handleAddField}  className='add'>Add Field</button>
        <button onClick={handleSave} className='save_button'>Save</button>
        <button onClick={onClose} className='close'>Close</button>
        </div>
      </div>
    </div>
  );
};
export default PopUp;
