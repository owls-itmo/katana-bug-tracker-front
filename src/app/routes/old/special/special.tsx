import { Groups, SpecialFunctionsApi } from 'app/api/old/special';
import BigText from 'app/components/bigText';
import { FieldInput } from 'app/components/field';
import { NavGroup, NavBar } from 'app/components/navbar';
import { TableContainer } from 'app/components/table-container';
import React, { useEffect, useMemo, useState } from 'react'

export default function Special() {
  const [sum, setSum] = useState(0);

  const api = useMemo(() => new SpecialFunctionsApi(), [])

  const [lowerThan, setLowerThan] = useState(100);
  const [count, setCount] = useState(0);

  const [groups, setGroups] = useState<Groups>([]);

  useEffect(() => {
    api.getSum().then(setSum)
    api.getGroups().then(setGroups)
  }, [])

  useEffect(() => {
    api.getCount(lowerThan).then(setCount)
  }, [lowerThan])

  return <>
    <NavBar>
      <BigText>Total sum of rating: {sum}</BigText>
      <NavGroup>
        {count} object with rating lower than:
        <FieldInput value={lowerThan} onChange={(e) => setLowerThan(+e.target.value)} />
      </NavGroup>
    </NavBar>
    <TableContainer>
      <thead>
        <tr>
          <th>Rating</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        {groups.map((record) => (
          <tr key={record[0]}>
            <td>{record[0]}</td>
            <td>{record[1]}</td>
          </tr>
        ))}
      </tbody>
    </TableContainer>
  </>
}
