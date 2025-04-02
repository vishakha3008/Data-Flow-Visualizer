import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PopUp.css';

const EdgePopUp = ({ edgeData, onClose, onAddField, onSave, position }) => {
  const [fieldPairs, setFieldPairs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEdgeMetadata = async () => {
      try {
        
        console.log('Fetching edge metadata for edgeId:', edgeData?.edgeId);

        if (edgeData && edgeData.edgeId) {
          const response = await axios.get(`http://localhost:9000/flows/getEdgeMeta/${edgeData.edgeId}`);
          console.log('Response:', response.data);

          const existingMetadata = response.data;

          if (existingMetadata && existingMetadata.formFields) {
            setFieldPairs(existingMetadata.formFields);
          }

          setLoading(false);
        } else {
          console.error('Error: edgeData or edgeData.edgeId is undefined');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching edge metadata:', error);
        setLoading(false);
      }
    };

    fetchEdgeMetadata();
  }, [edgeData]);

  const handleAddField = () => {
    setFieldPairs([...fieldPairs, { key: '', value: '' }]);
  };

  const handleDeleteField = (index) => {
    const newPairs = [...fieldPairs];
    newPairs.splice(index, 1);
    setFieldPairs(newPairs);
  };

  const handleChangeField = (index, key, value) => {
    const newPairs = [...fieldPairs];
    newPairs[index] = { key, value };
    setFieldPairs(newPairs);
  };

  const handleSave = async () => {
    try {
      const response = await axios.post('http://localhost:9000/flows/saveEdgeMeta', {
        edgeId: edgeData.edgeId, // Use the correct edgeId from the props
        formFields: fieldPairs.map((pair, index) => ({
          id: index,
          values: [pair.key, pair.value],
        })),
      });

      if (response.status === 200) {
        console.log('Data successfully saved on the backend.');
        onClose();
      } else {
        console.error('Failed to save data on the backend.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content" style={position}>
        <div className="box">
          <h4>Edge Metadata</h4>
          {loading ? (
            <p>Loading...</p>
          ) : (
            fieldPairs.map((pair, index) => (
              <div key={index} className="form-row">
                <input
                  type="text"
                  placeholder="Attribute"
                  value={pair.key}
                  onChange={(e) => handleChangeField(index, e.target.value, pair.value)}
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={pair.value}
                  onChange={(e) => handleChangeField(index, pair.key, e.target.value)}
                />
                <button className="X" onClick={() => handleDeleteField(index)}>
                  X
                </button>
              </div>
            ))
          )}
        </div>
        <div className="operations">
          <button className="add" onClick={handleAddField}>
            Add Field
          </button>
          <button className="save_button" onClick={handleSave}>
            Save
          </button>
          <button className="close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EdgePopUp;
