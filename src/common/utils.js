const DatePicker = 'DP';

let datePickerId = 0; let
  randomId = 0;

function* getDynamicIdByElementType(element) {
  switch (element) {
    case DatePicker: while (true) { yield `date-picker-${++datePickerId}`; }
    default: while (true) { yield ++randomId; }
  }
}

export const randomDatePickerId = getDynamicIdByElementType(DatePicker);
