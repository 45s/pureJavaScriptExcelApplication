function getBtn(btn) {
  const meta = `
    data-type="btn"
    data-value='${JSON.stringify(btn.value)}'
  `
  return /* html */ `
    <button
      type="button"
      ${meta}
      class="button ${btn.active ? 'active' : ''}"
    >
      <i 
        class="material-icons"
        ${meta}
      >
        ${btn.icon}
      </i>
    </button>
  `
}

export function createToolbar(s) {
  const buttons = [
    {
      value: { textAlign: 'left' },
      icon: 'format_align_left',
      active: s.textAlign === 'left',
    },
    {
      value: { textAlign: 'center' },
      icon: 'format_align_center',
      active: s.textAlign === 'center',
    },
    {
      value: { textAlign: 'right' },
      icon: 'format_align_right',
      active: s.textAlign === 'right',
    },
    {
      value: {
        fontWeight: s.fontWeight === 'bold' ? 'normal' : 'bold',
      },
      icon: 'format_bold',
      active: s['fontWeight'] === 'bold',
    },
    {
      value: {
        fontStyle: s.fontStyle === 'italic' ? 'normal' : 'italic',
      },
      icon: 'format_italic',
      active: s.fontStyle === 'italic',
    },
    {
      value: {
        textDecoration: s.textDecoration === 'underline' ? 'none' : 'underline',
      },
      icon: 'format_underline',
      active: s.textDecoration === 'underline',
    },
  ]

  return buttons.map(getBtn).join(' ')
}
