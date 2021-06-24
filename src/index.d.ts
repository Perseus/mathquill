export module MQ {
  export type Config = {
    /**
     * If spaceBehavesLikeTab is true the keystrokes {Shift-,}Spacebar will behave like {Shift-,}Tab escaping from the current block (as opposed to the default behavior of inserting a Space character).
     */
    spacesBehavesLikeTab: boolean,

    /**
     * This allows you to change the way the left and right keys move the cursor when there are items of different height, like fractions.
     */
    leftRightIntoCmdGoes: 'up' | 'down',

    /**
     * If restrictMismatchedBrackets is true then you can type [a,b) and (a,b], but if you try typing [x} or \langle x|, you'll get [{x}] or \langle|x|\rangle instead. This lets you type (|x|+1) normally; otherwise, you'd get \left( \right| x \left| + 1 \right).
     */
    restrictMismatchedBrackets: boolean,

    /**
     * If sumStartsWithNEquals is true then when you type \sum, \prod, or \coprod, the lower limit starts out with n=, e.g. you get the LaTeX \sum_{n=}^{ }, rather than empty by default.
     */
    sumStartsWithNEquals: boolean,

    /**
     * supSubsRequireOperand disables typing of superscripts and subscripts when there's nothing to the left of the cursor to be exponentiated or subscripted.
     */
    supSubsRequireOperand: boolean,

    /**
     * charsThatBreakOutOfSupSub takes a string of the chars that when typed, "break out" of superscripts and subscripts.
     */
    charsThatBreakOutOfSupSub: string,

    /**
     * autoCommands defines the set of commands automatically rendered by just typing the letters without typing a backslash first.
     */
    autoCommands: string,

    /**
     * maxDepth specifies the maximum number of nested MathBlocks.
     */
    maxDepth: number,

    /**
     * substituteTextarea is a function that creates a focusable DOM element that is called when setting up a math field.
     */
    substituteTextarea: function,
  };

  export interface InstanceMethods {
    /**
       * Any element that has been turned into a MathQuill instance can be reverted
       */
    revert: () => JQuery.Node,

    /**
      * MathQuill uses computed dimensions, so if they change (because an element was mathquill-ified before it was in the visible HTML DOM, or the font size changed), then you'll need to tell MathQuill to recompute.
      */
    reflow: () => void,

    /**
      * Returns the root HTML element.
      */
    el: () => JQuery.Node,

    /**
      * Returns the contents as LaTeX
      */
    latex: () => string,

    /**
     * This will render the argument as LaTeX in the MathQuill instance
     */
    latex: (latex_string: string) => void,
  }

  export interface StaticMath extends InstanceMethods {}

  export interface EditableMathField extends InstanceMethods {
    /**
     * Puts the focus on the editable field.
     */
    focus: () => void,

    /**
     * Removes foucs form the editable field
     */
    blur: () => void,

    /**
     * Write the given LaTeX at the current cursor position.
     * If the cursor does not have focus, writes to last position the cursor occupied in the editable field.
     */
    write: (latex_string: string) => void,

    /**
     * Enter a LaTeX command at the current cursor position or with the current selection.
     * If the cursor does not have focus, it writes it to last position the cursor occupied in the editable field.
     */
    cmd: (latex_string: string) => void,

    /**
     * Selects the contents of the node
     */
    select: () => void,

    /**
     * Clears the selection
     */
    clearSelection: () => void,

    /**
     * Moves the cursor to the left end of the editable field
     */
    moveToLeftEnd: () => void,

    /**
     * Moves the cursor to the right end of the editable field
     */
    moveToRightEnd: () => void,

    /**
     * Simulates keystrokes given a string like "Ctrl-Home Del", a whitespace-delimited list of key inputs with optional prefixes.
     */
    keystore: (keys: string) => void,

    /**
     * Simulates typing text, one character at a time from where the cursor currently is.
     * This is supposed to be identical to what would happen if a user were typing the text in.
     */
    typedText: (text: string) => void,

    /**
     * Changes the configuration of just this math field.
     */
    config: (new_config: Config) => void,

  }

  export interface Interface {
    config: Config,
    registerEmbed: (name: string, options: Record<string, string>) => void,

    /**
     * Returns the html of the root MQ element
     */
    html: () => HTMLElement,

    StaticMath: (el: HTMLElement) => StaticMath,
    MathField: (el: HTMLElement, config?: Config) => EditableMathField,

    MQ: (el: HTMLElement) => EditableMathField
  }

}


declare class MathQuill {
  /**
   * Returns the MathQuill interface for the given version
   *
   * @param v Version of the interface to fetch (2 is the latest)
   */
  getInterface:(v: number) => MQ.Interface
};

export default new MathQuill();
