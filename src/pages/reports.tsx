import React, { useState } from 'react';

import { Select, DateInput } from '@app/components';

const Reports = () => {
  const [s, cs] = useState('dupa');
  const [d, cd] = useState('');

  console.log(d);

  return (
    <div>
      <Select value={s} onChange={(value) => cs(value?.toString() ?? '')}>
        <option value="dupa">Foo</option>
        <option value="chuj">Bar</option>
      </Select>

      <DateInput
        value={d}
        onChange={cd}
        minDate="2021-01-01"
        maxDate="2021-12-31"
      />
    </div>
  );
};

export default Reports;
