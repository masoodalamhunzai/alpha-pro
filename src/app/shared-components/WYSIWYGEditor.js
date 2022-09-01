import { useState, forwardRef } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles({
  root: {
    "& .rdw-dropdown-selectedtext": {
      color: "inherit",
    },
    "& .rdw-editor-main": {
      overflow: "hidden",
    },
  },
  toolbar: {
    borderWidth: "0 0 1px 0!important",
    margin: "0!important",
  },
  wrapper: {},
  editor: {
    padding: "8px 12px",
    height: `${100}px!important`,
  },
});

const WYSIWYGEditor = forwardRef((props, ref) => {
  const classes = useStyles();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  function onEditorStateChange(_editorState) {
    console.log("value in WYSIWYGEditor ", _editorState);
    setEditorState(_editorState);
    props.setEditorContent(
      draftToHtml(convertToRaw(_editorState.getCurrentContent()))
    );
    return props.onChange(
      draftToHtml(convertToRaw(_editorState.getCurrentContent()))
    );
  }

  return (
    <div
      className={clsx(
        classes.root,
        "rounded-4 border-1 overflow-hidden w-full",
        props.className
      )}
      ref={ref}
    >
      <Editor
        editorState={editorState}
        toolbarClassName={classes.toolbar}
        wrapperClassName={classes.wrapper}
        editorClassName={classes.editor}
        onEditorStateChange={onEditorStateChange}
        // toolbarOnFocus
        placeholder="Compose Question"
        ariaLabel="Compose Question"
      />
    </div>
  );
});

export default WYSIWYGEditor;
