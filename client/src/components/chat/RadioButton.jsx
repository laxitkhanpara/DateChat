import styled from 'styled-components';

const RadioLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  cursor: pointer;
`;

const RadioInput = styled.input`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #999;
  border-radius: 50%;
  margin-right: 8px;
  position: relative;
  top: 2px;

  &:checked {
    border-color: #007bff;
  }
`;

const RadioButton = ({ value, checked, onChange }) => {
  return (
    <RadioLabel>
      <RadioInput
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {value}
    </RadioLabel>
  );
};

export default RadioButton;
