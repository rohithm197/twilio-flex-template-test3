import { Template, templates } from '@twilio/flex-ui';
import { Select, Option } from '@twilio-paste/core/select';
import { Label } from '@twilio-paste/core/label';
import { Tr, Th, Td } from '@twilio-paste/core/table';

interface OwnProps {
  id: string;
  label: string;
  value: string;
  options: string[];
  onChangeHandler: (value: string) => void;
}

const FormRowSelect = ({ id, label, value, options, onChangeHandler }: OwnProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value !== 'none') onChangeHandler(value);
  };

  return (
    <Tr key={id}>
      <Th scope="row">
        <Label htmlFor={id}>
          <Template source={templates[`PSUpdateWorker${label}`]} />
        </Label>
      </Th>
      <Td>
        <Select value={value} onChange={handleChange} id={id}>
          <Option key="none" value="none">
            Select {label}
          </Option>
          {options.map((option) => {
            return (
              <Option key={option} value={option}>
                {option}
              </Option>
            );
          })}
        </Select>
      </Td>
    </Tr>
  );
};

export default FormRowSelect;