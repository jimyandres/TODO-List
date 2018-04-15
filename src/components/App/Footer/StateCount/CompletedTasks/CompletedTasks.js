import React from 'react';

const CompletedTasks = ({count = 0}) =>
  <div id="CompletedTasks" className="left">
    {count} Items Left
  </div>

export default CompletedTasks;
