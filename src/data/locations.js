const locations = [
  {
    key: 'state1',
    label: 'State One',
    districts: [
      {
        key: 'district1',
        label: 'District A',
        blocks: [
          {
            key: 'block1',
            label: 'Block X',
            villages: [
              { key: 'village1', label: 'Village 1' },
              { key: 'village2', label: 'Village 2' }
            ]
          },
          {
            key: 'block2',
            label: 'Block Y',
            villages: [
              { key: 'village3', label: 'Village 3' },
              { key: 'village4', label: 'Village 4' }
            ]
          }
        ]
      },
      {
        key: 'district2',
        label: 'District B',
        blocks: [
          {
            key: 'block3',
            label: 'Block Z',
            villages: [
              { key: 'village5', label: 'Village 5' },
              { key: 'village6', label: 'Village 6' }
            ]
          }
        ]
      }
    ]
  },
  {
    key: 'state2',
    label: 'State Two',
    districts: [
      {
        key: 'district3',
        label: 'District C',
        blocks: [
          {
            key: 'block4',
            label: 'Block M',
            villages: [
              { key: 'village7', label: 'Village 7' },
              { key: 'village8', label: 'Village 8' }
            ]
          }
        ]
      }
    ]
  }
];

export default locations;
