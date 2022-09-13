import { useState, useEffect } from "react";
import FusePageSimple from "@fuse/core/FusePageSimple";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useStateValue } from "app/services/state/State";
import { actions } from "app/services/state/Reducer";
import { useHistory, useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { saveQuestion, saveItem,getItemById,getQuestionByItemId } from "app/services/api/ApiManager";
import swal from "sweetalert";
// import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useForm } from "react-hook-form";
import _ from "@lodash";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Breadcrumb from "../../fuse-layouts/shared-components/Breadcrumbs";
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import ItemConfiguration from "./ItemConfiguration";

import TabbedSection from "./TabbedSection";
import SimpleSection from "./SimpleSection";
import ClozeWithDropDownLayout from "./ClozeWithDropDown/ClozeWithDropDownLayout";
import ClozeWithDragAndDropLayout from "./ClozeWithDragAndDrop/ClozeWithDragAndDropLayout";
import ClozeWithTextLayout from "./ClozeWithText/ClozeWithTextLayout";

const useStyles = makeStyles({
  layoutRoot: {},
});

const defaultValues = { name: "", email: "", subject: "", message: "" };
/* const schema = yup.object().shape({
  name: yup.string().required('You must enter a name'),
  subject: yup.string().required('You must enter a subject'),
  message: yup.string().required('You must enter a message'),
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
}); */

const CreateItem = () => {
  const location = useLocation();
  const history = useHistory();
  const pageTitle = location.pathname
    .split("/")
    .filter((x) => x)[0]
    .split("-")
    .join(" ");
  const classes = useStyles();
  const [{ user, news,itemQuestionsList , defaultPageSize }, dispatch] =
  useStateValue();
  const { itemIdProps, mode } = location?.state ? location?.state : "";

  console.log(itemIdProps, "itemIdProps");

  const [itemId, setItemId] = useState(itemIdProps);
  const [questionId, setQuestionId] = useState('');
  const [count, setCount] = useState(0);
  const [editorContent, setEditorContent] = useState("");
  const [multipleChoices, setMultipleChoices] = useState([]);
  const [nameDetails, setNameDetails] = useState(itemIdProps);
  const [descriptionDetails, setDescriptionDetails] = useState("");
  const [statusButtonDetails, setStatusButtonDetails] = useState("");
  const [difficultyButtonDetails, setDifficultyButtonDetails] = useState("");
  const [scoringType, setScoringType] = useState(1);
  const [contentSource, setContentSource] = useState("");
  const [contentNotes, setContentNotes] = useState("");
  const [contentAcknowledgements, setContentAcknowledgements] = useState("");

  const [selectedLayout, setSelectedLayout] = useState("1");
  const [tagsList, setTagsList] = useState([]);
  const [tabsInColumn, setTabsInColumn] = useState(false);
  const [tabsInColumnOne, setTabsInColumnOne] = useState(false);
  const [tabsInColumnTwo, setTabsInColumnTwo] = useState(false);
  const [verticalDivider, setVerticalDivider] = useState(false);
  const [scrollingForLongContent, setScrollingForLongContent] = useState(false);

  const [componentsList, setComponentsList] = useState([]);
  const [componentsStructureList, setComponentsStructureList] = useState([]);

  //Cloze With Text Layout starts

  const [clozeWithTextMatchAllResponses, setClozeWithTextMatchAllResponses] =
    useState(false);
  const [clozeWithTextTemplateMarkup, setClozeWithTextTemplateMarkup] =
    useState("");
  const [clozeWithTextEditorContent, setClozeWithTextEditorContent] =
    useState("");
  const [clozeWithTextCorrectAnswer, setClozeWithTextCorrectAnswer] = useState([
    {
      id: `item-1`,
      position: 0,
      title: "Response 1",
      isCorrect: false,
      isAlternate: false,
    },
    {
      id: `item-2`,
      position: 1,
      title: "Response 2",
      isCorrect: false,
      isAlternate: false,
    },
  ]);

  //Cloze With Texts Layout ends

  //trueFalse layout starts
  const [trueFalseShuffleOption, setTrueFalseShuffleOption] = useState(false);
  const [trueFalseEditorContent, setTrueFalseEditorContent] = useState("");
  const [trueFalseMultipleChoices, setTrueFalseMultipleChoices] = useState([
    {
      id: `item-1`,
      position: 0,
      title: "True",
      isCorrect: false,
      isAlternate: false,
    },
    {
      id: `item-2`,
      position: 1,
      title: "False",
      isCorrect: false,
      isAlternate: false,
    },
  ]);
  //trueFalse layout ends

  //ClozeWithDropDown starts

  const [clozeWithDropDownEditorContent, setClozeWithDropDownEditorContent] =
    useState("");
  const [clozeWithDropDownTemplateMarkup, setClozeWithDropDownTemplateMarkup] =
    useState("");
  const [
    clozeWithDropDownMultipleChoices,
    setClozeWithDropDownMultipleChoices,
  ] = useState([
    {
      responses: [
        {
          id: `item-1}`,
          position: 0,
          choice: "",
          title: "first 1",
          isCorrect: false,
          isAlternate: false,
        },
        {
          id: `item-2}`,
          position: 1,
          choice: "",
          title: "first 2",
          isCorrect: false,
          isAlternate: false,
        },
      ],
    },
    {
      responses: [
        {
          id: `item-1}`,
          position: 0,
          choice: "",
          title: "second 1",
          isCorrect: false,
          isAlternate: false,
        },
        {
          id: `item-2}`,
          position: 1,
          choice: "",
          title: "second 2",
          isCorrect: false,
          isAlternate: false,
        },
      ],
    },
  ]);

  //ClozeWithDropDown ends

  //ClozeWithDragAndDrop starts
  const [
    clozeWithDragAndDropEditorContent,
    setClozeWithDragAndDropEditorContent,
  ] = useState("");
  const [
    clozeWithDragAndDropTemplateMarkup,
    setClozeWithDragAndDropTemplateMarkup,
  ] = useState("");
  const [
    clozeWithDragAndDropMultipleChoices,
    setClozeWithDragAndDropMultipleChoices,
  ] = useState([
    {
      groupTitle: "Title 1",
      responses: [
        {
          id: `item-1}`,
          position: 0,
          choice: "",
          title: "first 1",
          isCorrect: false,
          isAlternate: false,
        },
        {
          id: `item-2}`,
          position: 1,
          choice: "",
          title: "first 2",
          isCorrect: false,
          isAlternate: false,
        },
      ],
    },
    {
      groupTitle: "Title 2",
      responses: [
        {
          id: `item-1}`,
          position: 0,
          choice: "",
          title: "second 1",
          isCorrect: false,
          isAlternate: false,
        },
        {
          id: `item-2}`,
          position: 1,
          choice: "",
          title: "second 2",
          isCorrect: false,
          isAlternate: false,
        },
      ],
    },
  ]);
  //ClozeWithDragAndDrop ends

  // Choice Matrix start
  const [choiceMatricEditorContent, setChoiceMatricEditorContent] =
    useState("");
  const [choiceMatricMultipleChoices, setChoiceMatricMultipleChoices] =
    useState([
      {
        id: `item-1}`,
        position: 0,
        title: "",
        isCorrect: false,
        isAlternate: false,
      },
      {
        id: `item-2`,
        position: 1,
        title: "",
        isCorrect: false,
        isAlternate: false,
      },
      {
        id: `item-3`,
        position: 2,
        title: "",
        isCorrect: false,
        isAlternate: false,
      },
      {
        id: `item-4`,
        position: 3,
        title: "",
        isCorrect: false,
        isAlternate: false,
      },
    ]);
  const [choiceMatricMultipleOptions, setChoiceMatricMultipleOptions] =
    useState([
      {
        id: `item-1}`,
        position: 0,
        title: "True",
        isCorrect: false,
        isAlternate: false,
      },
      {
        id: `item-2`,
        position: 1,
        title: "False",
        isCorrect: false,
        isAlternate: false,
      },
    ]);
  // Choice Matrix end

  //EssayWithRichText Layout starts

  const [essayWithRichTextEditorContent, setEssayWithRichTextEditorContent] =
    useState("");
  const [essayWithRichTextWordLimit, setEssayWithRichTextWordLimit] =
    useState(10000);
  const [essayWithRichTextWordLimitType, setEssayWithRichTextWordLimitType] =
    useState("");

  //EssayWithRichText Layout ends

  //Audio recorder Layout starts

  const [audioRecorderEditorContent, setAudioRecorderEditorContent] =
    useState("");
  const [audioRecorderMaximumSecond, setAudioRecorderMaximumSecond] =
    useState(1);
  const [audioRecorderPlayerType, setAudioRecorderPlayerType] = useState("");

  //audio recorder Layout ends

  //ShortText Layout starts

  const [shortTextEditorContent, setShortTextEditorContent] = useState("");
  const [shortTextPoints, setShortTextPoints] = useState(1);
  const [shortTextAllow, setShortTextAllow] = useState("");
  const [shortTextValue, setShortTextValue] = useState("");

  //ShortText Layout ends

  //EssayWithPlainTextLayout starts
  const [
    essayWithPlainTextLayoutEditorContent,
    setEssayWithPlainTextLayoutEditorContent,
  ] = useState("");
  const [
    essayWithPlainTextLayoutWordLimit,
    setEssayWithPlainTextLayoutWordLimit,
  ] = useState(10000);

  const [
    essayWithPlainTextLayoutWordType,
    setEssayWithPlainTextLayoutWordType,
  ] = useState("");
  //EssayWithPlainTextLayout ends

  //OrderList Layout starts

  const [orderListEditorContent, setOrderListEditorContent] = useState("");
  const [orderListList, setOrderListList] = useState([
    {
      id: `item-1}`,
      position: 0,
      title: "Test1",
      isCorrect: false,
      isAlternate: false,
    },
    {
      id: `item-2`,
      position: 1,
      title: "Test2",
      isCorrect: false,
      isAlternate: false,
    },
    {
      id: `item-3`,
      position: 2,
      title: "Test3",
      isCorrect: false,
      isAlternate: false,
    },
  ]);

  //OrderList Layout ends

  //MatchList Layout Starts
  const [matchListEditorContent, setMatchListEditorContent] = useState("");
  const [matchListPossibleResponses, setMatchListPossibleResponses] = useState([
    {
      id: `item-1}`,
      position: 0,
      title: "Test1",
      isCorrect: false,
      isAlternate: false,
    },
    {
      id: `item-2`,
      position: 1,
      title: "Test2",
      isCorrect: false,
      isAlternate: false,
    },
    {
      id: `item-3`,
      position: 2,
      title: "Test3",
      isCorrect: false,
      isAlternate: false,
    },
  ]);
  const [matchListStimulusList, setMatchListStimulusList] = useState([
    {
      id: `item-1}`,
      position: 0,
      title: "Item1",
      isCorrect: false,
      isAlternate: false,
    },
    {
      id: `item-2`,
      position: 1,
      title: "Item2",
      isCorrect: false,
      isAlternate: false,
    },
    {
      id: `item-3`,
      position: 2,
      title: "Item2",
      isCorrect: false,
      isAlternate: false,
    },
  ]);

  //MatchList Layout Ends

  //Classification Layout starts
  const [classificationColumnCount, setClassificationColumnCount] = useState(1);
  const [classificationRowCount, setClassificationRowCount] = useState(1);
  const [classificationEditorContent, setClassificationEditorContent] =
    useState("");
  const [classificationPossibleResponses, setClassificationPossibleResponses] =
    useState([
      {
        id: `item-1}`,
        position: 0,
        title: "Test1",
        isCorrect: false,
        isAlternate: false,
      },
      {
        id: `item-2`,
        position: 1,
        title: "Test2",
        isCorrect: false,
        isAlternate: false,
      },
      {
        id: `item-3`,
        position: 2,
        title: "Test3",
        isCorrect: false,
        isAlternate: false,
      },
      {
        id: `item-4`,
        position: 3,
        title: "Test4",
        isCorrect: false,
        isAlternate: false,
      },
    ]);
  const [classificationColumnTitles, setClassificationColumnTitles] = useState([
    {
      id: `item-1}`,
      position: 0,
      title: "Column1",
      isCorrect: false,
      isAlternate: false,
    },
    {
      id: `item-2`,
      position: 1,
      title: "Column2",
      isCorrect: false,
      isAlternate: false,
    },
  ]);
  //Classification Layout end
  const setNews = async () => {
    dispatch({
      type: actions.SET_NEWS,
      payload: { header: "new header text", des: "new description text" },
    });
  };

  const { control, handleSubmit, watch, formState } = useForm({
    mode: "onChange",
    defaultValues,
    // resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;
  const form = watch();
  const redirectTo = async (goTo) => {
    try {
      history.push(goTo);
    } catch (err) {
      // console.log(err);
    }
  };
  const onSaveQuestion = async (sectionname, tabname,questionId,questionIndex,questiontype) => {
    console.log('onSaveQuestion sectionname ',sectionname);
     console.log('onSaveQuestion tabname ',tabname);
     console.log('onSaveQuestion questionId ',questionId);
      console.log('onSaveQuestion questionIndex ',questionIndex);
      console.log('onSaveQuestion questiontype ',questiontype);
    console.log('onSaveQuestion multipleChoices ',multipleChoices);
    try {
      if(questionId!=null)
      {
        const finalItemObject = {
          id:questionId,
          description: editorContent,
          options: multipleChoices,
         // itemId: "1eff4c49-fcb1-432e-83c8-c5a0023ee5e0",
          questionType: questiontype,//"simple-mcqs",
          questionConfig: "{\"some_key_1\": \"some_val_1\", \"some_key_2\": \"some_value_2\"}",
          position: 1
        };
        if (editorContent === "" || editorContent === "<p></p>\n") {
          swal({
            title: "Error!",
            text: "Question Description is Required!",
            icon: "error",
            button: "Ok!",
          });
        }
        if (multipleChoices === [] || multipleChoices.length === 0) {
          swal({
            title: "Error!",
            text: "Multiple Choice Options are Required!",
            icon: "error",
            button: "Ok!",
          });
        } else {
          const res = await saveQuestion(
            finalItemObject,
            itemId,
            user
          );
          console.log('onSaveQuestion res is ',res);
          if (res && res.data && res.data.status === "success") {
            swal({
              title: "Good job!",
              text: "Question Updated Successfully!",
              icon: "success",
              button: "Ok!",
            }).then((value) => {
             // setEditorContent("");
            //  setMultipleChoices([]);
              console.log("saved successfully");
            //  redirectTo("/all-questions");
            });
          }
        }
      }else
      {
        const finalItemObject = {
          description: editorContent,
          options: multipleChoices,
         // itemId: "1eff4c49-fcb1-432e-83c8-c5a0023ee5e0",
          questionType: questiontype, // "simple-mcqs",
          questionConfig: "{\"some_key_1\": \"some_val_1\", \"some_key_2\": \"some_value_2\"}",
          position: 1
        };
        if (editorContent === "" || editorContent === "<p></p>\n") {
          swal({
            title: "Error!",
            text: "Question Description is Required!",
            icon: "error",
            button: "Ok!",
          });
        }
        if (multipleChoices === [] || multipleChoices.length === 0) {
          swal({
            title: "Error!",
            text: "Multiple Choice Options are Required!",
            icon: "error",
            button: "Ok!",
          });
        } else {
          const res = await saveQuestion(
            finalItemObject,
            itemId,
            user
          );
          console.log('onSaveQuestion res is ',res);
          if (res && res.data && res.data.status === "success") {
            swal({
              title: "Good job!",
              text: "Question Saved Successfully!",
              icon: "success",
              button: "Ok!",
            }).then((value) => {
            //  setEditorContent("");
            //  setMultipleChoices([]);
              console.log("saved successfully");
            //  redirectTo("/all-questions");
            });

              //...here shuffles question to push new created question id in layout
              const comp = componentsStructureList;
              comp.forEach((item) => {
                if (item.Section === sectionname) {
                  if (item.isTabbed === true) {
                    item.Tabs.forEach((tab) => {
                      if (tab.TabName === tabname) {
                        if(tab.QuestionsList && tab.QuestionsList.length>0)
                        {
                          console.log('res.data.question.id ',res.data.question.id);
                        tab.QuestionsList[questionIndex].id=res.data.question.id;
                       // tab.QuestionsList.push(question);
                        }
                      }
                    });
                  } else {
                    if(item.QuestionsList && item.QuestionsList.length>0)
                        {
                          console.log('res.data.question.id in else case ',res.data.question.id);
                    item.QuestionsList[questionIndex].id=res.data.question.id;
                    //item.QuestionsList.push(question);
                        }
                  }
                }
              });
              setComponentsStructureList([...comp]);
              console.log("compin save question ", comp);
              console.log("componentsStructureList in save question ", componentsStructureList);
            





          }
        }

      }

      
    } catch (error) {
      console.log('onSaveQuestion error is ',error);
      swal({
        title: "Error!",
        text: "Something Went Wrong,Please Contact Admin!",
        icon: "error",
        button: "Ok!",
      });
      // setStatus({ success: false });
      // setErrors({ submit: error.message });
      // setSubmitting(false);
    }
  };

  const onSaveItem = async () => {
    try {
      const itemObject = {
        title: nameDetails,
        description: descriptionDetails,
        id: itemId,
        layout: JSON.stringify(componentsStructureList),
        status: "draft",
        scoringType: "dichotomous",
        difficultyLevel: "easy",
      };
      if (itemId === '') {
        swal({
          title: "Error!",
          text: "Item Doesnt Exist!",
          icon: "error",
          button: "Ok!",
        });
      }
      if (nameDetails === "") {
        swal({
          title: "Error!",
          text: "Name is Required!",
          icon: "error",
          button: "Ok!",
        });
      }
      if (descriptionDetails === "") {
        swal({
          title: "Error!",
          text: "Description is Required!",
          icon: "error",
          button: "Ok!",
        });
      } else {
        const res = await saveItem(itemObject, user);

        if (res && res.data && res.data.status === "success") {
          swal({
            title: "Good job!",
            text: "Item Saved Successfully!",
            icon: "success",
            button: "Ok!",
          }).then((value) => {
            setEditorContent("");
            setMultipleChoices([]);
            console.log("saved successfully");
            //  redirectTo('/all-questions');
          });
        }
      }
    } catch (error) {
      swal({
        title: "Error!",
        text: "Something Went Wrong, Please Contact Admin!",
        icon: "error",
        button: "Ok!",
      });
      // setStatus({ success: false });
      // setErrors({ submit: error.message });
      // setSubmitting(false);
    }
  };
  if (_.isEmpty(form)) {
    return null;
  }
  function onNewOptionAdded(index) {
    const option = {
      id: `item-${index + 1}`,
      position: index,
      title: "",
      isCorrect: false,
      isAlternate: false,
    };
    let choices = [];
    choices = multipleChoices;
    choices.push(option);
    setMultipleChoices(choices);
  }

  const handleComponentDragDrop = (newValue) => {
    const comp = componentsList;
    comp.push({ component: newValue });
    setComponentsList([...comp]);
    onNewTabAdded("A", 1);
  };

  useEffect(() => {
   // getItemLayout();
   if(itemId==null || itemId=='')
   {
    createInitialItem();
   }else
   {
    getItem(itemId);
    getItemQuestions(itemId);
   }
  }, []);

   const createInitialItem = async () => {
    try {
      console.log('create Initial Item called');
      const itemObject = {
        title: "New Item",
        description: "New Item",
        organizationId:
          user && user.organization && user.organization.id
            ? user.organization.id
            : "", // '37cb22ba-fdb4-478f-b0d3-35312134e7ec',
           status: "draft",
           scoringType: "dichotomous",
            difficultyLevel: "easy",
            layout:JSON.stringify( [{
              Section: "A",
              Layout: "12",
              isTabbed: false,
              QuestionsList: [],
            }]),

      };
        const res = await saveItem(itemObject, user);
        console.log('create item res on page load ',res);
        if (res && res.data && res.data.status === "success") {
          if(res.data.item)
          {
          setItemId(res.data.item.id);
          setNameDetails(res.data.item.id);
          setDescriptionDetails(res.data.item.description);
          if(res.data.item.layout)
          {
          setComponentsStructureList(JSON.parse(res.data.item.layout));
          }
          console.log('Basic item created successfully');
          }
        }
      
    } catch (error) {
      console.log('create item error on page load ',error);
      swal({
        title: "Error!",
        text: "Something Went Wrong on Creating Item, Please Contact Admin!",
        icon: "error",
        button: "Ok!",
      });
      // setStatus({ success: false });
      // setErrors({ submit: error.message });
      // setSubmitting(false);
    }
  };

  const getItem = async (itemId) => {
    try {
      console.log('getItem called ',itemId);

        const res = await getItemById(itemId, user);
        console.log('getItem res on page load ',res);
        if (res && res.status === 200 && res.data) {
          if(res.data.description)
          {
            setDescriptionDetails(res.data.description);
          }
          if(res.data.layout)
          {
          setComponentsStructureList(JSON.parse(res.data.layout));
          }
        }
        console.log('getItem componentsStructureList  =  ',componentsStructureList);
    } catch (error) {
      console.log('create item error on page load ',error);
      swal({
        title: "Error!",
        text: "Something Went Wrong, Please Contact Admin!",
        icon: "error",
        button: "Ok!",
      });
      // setStatus({ success: false });
      // setErrors({ submit: error.message });
      // setSubmitting(false);
    }
  };

  const getItemQuestions = async (itemId) => {
    try {
      console.log('getQuestionsByItemId called');

        const res = await getQuestionByItemId(itemId, user);
        console.log('getQuestionsByItemId res on page load ',res);
        if (res && res.status === 200 && res.data && res.data.length > 0) {
          dispatch({
            type: actions.SET_ITEM_QUESTIONS_LIST,
            payload: res.data,
          });
        }
        console.log('itemQuestionsList  =  ',itemQuestionsList);
    } catch (error) {
      console.log('create item error on page load ',error);
      swal({
        title: "Error!",
        text: "Something Went Wrong, Please Contact Admin!",
        icon: "error",
        button: "Ok!",
      });
      // setStatus({ success: false });
      // setErrors({ submit: error.message });
      // setSubmitting(false);
    }
  };



  function onNewTabAdded(section, title) {
    const tab = { TabName: title, QuestionsList: [], Layout: "12" };
    const comp = componentsStructureList;
    comp.forEach((item) => {
      if (item.Section === section) {
        item.Tabs.push(tab);
      }
    });
    setComponentsStructureList([...comp]);
    console.log("comp ", comp);
    console.log("componentsStructureList ", componentsStructureList);
    // let tabs=comp.Tabs;
    // choices = multipleChoices;
    // comp.push(option);
    // setMultipleChoices(choices);
  }

  function handleQuestionDragDrop(sectionname, tabname, componentName) {
    console.log("this is tesing for drop issue ",componentsStructureList);
    const question = { component: componentName,id:null };
    const comp = componentsStructureList;
    comp.forEach((item) => {
      if (item.Section === sectionname) {
        if (item.isTabbed === true) {
          item.Tabs.forEach((tab) => {
            if (tab.TabName === tabname) {
              tab.QuestionsList.push(question);
            }
          });
        } else {
          item.QuestionsList.push(question);
        }
      }
    });
    console.log('comp before setting up ',comp);
    setComponentsStructureList([...comp]);
    console.log("comp ", comp);
    console.log("componentsStructureList ", componentsStructureList);
    // let tabs=comp.Tabs;
    // choices = multipleChoices;
    // comp.push(option);
    // setMultipleChoices(choices);
  }

  function getItemLayout() {
    const section = [];
    if (selectedLayout === "1") {
      if (tabsInColumn === true) {
        section.push({
          Section: "A",
          Layout: "12",
          isTabbed: true,
          Tabs: [{ TabName: "Tab 1", QuestionsList: [], Layout: "12" }],
        });
      } else {
        section.push({
          Section: "A",
          Layout: "12",
          isTabbed: false,
          QuestionsList: [],
        });
      }
    } else {
      if (tabsInColumnOne === true) {
        section.push({
          Section: "A",
          Layout: "6",
          isTabbed: true,
          Tabs: [{ TabName: "Tab 1", QuestionsList: [], Layout: "12" }],
        });
      } else {
        section.push({
          Section: "A",
          Layout: "6",
          isTabbed: false,
          QuestionsList: [],
        });
      }
      if (tabsInColumnTwo === true) {
        section.push({
          Section: "B",
          Layout: "6",
          isTabbed: true,
          Tabs: [{ TabName: "Tab 1", QuestionsList: [], Layout: "12" }],
        });
      } else {
        section.push({
          Section: "B",
          Layout: "6",
          isTabbed: false,
          QuestionsList: [],
        });
      }
    }
    setComponentsStructureList([...section]);
    /* const tab = { TabName: 'Tab 1', QuestionsList: [], Layout: '12' };
    const comp = componentsStructureList;
    comp.forEach((item) => {
      if (item.Section === section) {
        item.Tabs.push(tab);
      }
    });
    setComponentsStructureList([...comp]); */
  }

  function handleLayoutChange() {
    const _layout = [...componentsStructureList];
    console.log('_layout ',_layout);
    const section = [];
    // ..below logic is for extracting questions from a tab or multiple tabs or sections
    const questions = [];
    _layout.forEach((sec) => {
      if (sec.isTabbed === true) {
        sec.Tabs.forEach((tab) => {
          tab.QuestionsList.forEach((q) => {
            questions.push(q);
          });
        });
      } else {
        sec.QuestionsList.forEach((q) => {
          questions.push(q);
        });
      }
    });
    // ..above logic is for extracting questions from a tab or multiple tabs or sections
    if (selectedLayout === "1") {
      if (tabsInColumn === true) {
        section.push({
          Section: "A",
          Layout: "12",
          isTabbed: true,
          Tabs: [{ TabName: "Tab 1", QuestionsList: questions, Layout: "12" }],
        });
      } else {
        section.push({
          Section: "A",
          Layout: "12",
          isTabbed: false,
          QuestionsList: questions,
        });
      }
    } else {
      if (tabsInColumnOne === true) {
        section.push({
          Section: "A",
          Layout: "6",
          isTabbed: true,
          Tabs: [{ TabName: "Tab 1", QuestionsList: questions, Layout: "12" }],
        });
      } else {
        section.push({
          Section: "A",
          Layout: "6",
          isTabbed: false,
          QuestionsList: questions,
        });
      }
      if (tabsInColumnTwo === true) {
        section.push({
          Section: "B",
          Layout: "6",
          isTabbed: true,
          Tabs: [{ TabName: "Tab 1", QuestionsList: [], Layout: "12" }],
        });
      } else {
        section.push({
          Section: "B",
          Layout: "6",
          isTabbed: false,
          QuestionsList: [],
        });
      }
    }
    setComponentsStructureList([...section]);
    /* const tab = { TabName: 'Tab 1', QuestionsList: [], Layout: '12' };
    const comp = componentsStructureList;
    comp.forEach((item) => {
      if (item.Section === section) {
        item.Tabs.push(tab);
      }
    });
    setComponentsStructureList([...comp]); */
    console.log("this is tesing in handle layout ",componentsStructureList);
    console.log("updated section is ", section);
  }

  useEffect(() => {
    handleLayoutChange();
  }, [selectedLayout, tabsInColumn, tabsInColumnOne, tabsInColumnTwo]);

  const removeQuestion = () => {
    console.log("removeAnItem()");
  };

  /* const saveQuestion = () => {
    console.log("saveAnItem()");
  }; */

  const editQuestion = () => {
    console.log("editAnItem()");
  };

  return (
    <FusePageSimple
      classes={{
        root: classes.layoutRoot,
      }}
      header={
        <div className="p-24">
          <Breadcrumb />
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              color: "#000",
              fontWeight: 700,
              mt: 2,
              textTransform: "capitalize",
            }}
          >
            Create New Question
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ float: "right" }}
            aria-label="Save Draft"
            onClick={() => onSaveQuestion()}
            // startIcon={<AddIcon />}
          >
            Save Draft
          </Button>
        </div>
      }
      content={
        /*  <div className="p-24"> */
        <>
          <div className="flex">
            {/* this is for cofiguraton component */}

            <DndProvider backend={HTML5Backend}>
              <div
                className="flex flex-col w-full max-w-4xl"
                style={{ width: "40%", maxWidth: "380px", minWidth: "379px" }}
              >
                <ItemConfiguration
                  setNameDetails={setNameDetails}
                  nameDetails={nameDetails}
                  descriptionDetails={descriptionDetails}
                  setDescriptionDetails={setDescriptionDetails}
                  handleSaveItem={onSaveItem}
                  statusButtonDetails={statusButtonDetails}
                  setStatusButtonDetails={setStatusButtonDetails}
                  difficultyButtonDetails={difficultyButtonDetails}
                  setDifficultyButtonDetails={setDifficultyButtonDetails}
                  scoringType={scoringType}
                  setScoringType={setScoringType}
                  contentSource={contentSource}
                  setContentSource={setContentSource}
                  contentNotes={contentNotes}
                  setContentNotes={setContentNotes}
                  contentAcknowledgements={contentAcknowledgements}
                  setContentAcknowledgements={setContentAcknowledgements}
                  selectedLayout={selectedLayout}
                  setSelectedLayout={setSelectedLayout}
                  tabsInColumn={tabsInColumn}
                  setTabsInColumn={setTabsInColumn}
                  tabsInColumnOne={tabsInColumnOne}
                  setTabsInColumnOne={setTabsInColumnOne}
                  tabsInColumnTwo={tabsInColumnTwo}
                  setTabsInColumnTwo={setTabsInColumnTwo}
                  verticalDivider={verticalDivider}
                  setVerticalDivider={setVerticalDivider}
                  scrollingForLongContent={scrollingForLongContent}
                  setScrollingForLongContent={setScrollingForLongContent}
                  tagsList={tagsList}
                  setTagsList={setTagsList}
                  handleComponentDragDrop={handleComponentDragDrop}
                />
              </div>

              {/* this is for configuration component */}
              {componentsStructureList && 
              componentsStructureList.length>0 &&
               componentsStructureList.map((item, index) => {
                return (
                  <div
                    className="flex flex-col w-full max-w-4xl p-20"
                    style={{
                      width:
                        selectedLayout == "1"
                          ? "100%"
                          : selectedLayout == "50%"
                          ? "50%"
                          : selectedLayout == "30%,70%" && index % 2 == 0
                          ? "30%"
                          : selectedLayout == "30%,70%" && index % 2 !== 0
                          ? "70%"
                          : selectedLayout == "70%,30%" && index % 2 == 0
                          ? "70%"
                          : selectedLayout == "70%,30%" && index % 2 !== 0
                          ? "30%"
                          : selectedLayout == "40%,60%" && index % 2 == 0
                          ? "40%"
                          : selectedLayout == "40%,60%" && index % 2 !== 0
                          ? "60%"
                          : selectedLayout == "60%,40%" && index % 2 == 0
                          ? "60%"
                          : selectedLayout == "60%,40%" && index % 2 !== 0
                          ? "40%"
                          : "auto",
                    }}
                  >
                    {item.isTabbed === true ? (
                      <TabbedSection
                        TabsList={item.Tabs}
                        sectionName={item.Section}
                        handleNewTab={onNewTabAdded}
                        handleQuestionDragDrop={handleQuestionDragDrop}
                        multipleChoiceschoiceMatric={
                          choiceMatricMultipleChoices
                        }
                        setMultipleChoiceschoiceMatric={
                          setChoiceMatricMultipleChoices
                        }
                        multipleOptionschoiceMatric={
                          choiceMatricMultipleOptions
                        }
                        setMultipleOptionschoiceMatric={
                          setChoiceMatricMultipleOptions
                        }
                        editorContentchoiceMatric={choiceMatricEditorContent}
                        setEditorContentchoiceMatric={
                          setChoiceMatricEditorContent
                        }
                        multipleChoicestrueFalse={trueFalseMultipleChoices}
                        setMultipleChoicestrueFalse={
                          setTrueFalseMultipleChoices
                        }
                        editorContenttrueFalse={trueFalseEditorContent}
                        setEditorContenttrueFalse={setTrueFalseEditorContent}
                        trueFalseShuffleOptiontrueFalse={trueFalseShuffleOption}
                        setTrueFalseShuffleOptiontrueFalse={
                          setTrueFalseShuffleOption
                        }
                        //ubaid
                        clozeWithDropDownMultipleChoices={
                          clozeWithDropDownMultipleChoices
                        }
                        setClozeWithDropDownMultipleChoices={
                          setClozeWithDropDownMultipleChoices
                        }
                        clozeWithDropDownEditorContent={
                          clozeWithDropDownEditorContent
                        }
                        setClozeWithDropDownEditorContent={
                          setClozeWithDropDownEditorContent
                        }
                        clozeWithDropDownTemplateMarkup={
                          clozeWithDropDownTemplateMarkup
                        }
                        setClozeWithDropDownTemplateMarkup={
                          setClozeWithDropDownTemplateMarkup
                        }
                        clozeWithDragAndDropMultipleChoices={
                          clozeWithDragAndDropMultipleChoices
                        }
                        setClozeWithDragAndDropMultipleChoices={
                          setClozeWithDragAndDropMultipleChoices
                        }
                        clozeWithDragAndDropEditorContent={
                          clozeWithDragAndDropEditorContent
                        }
                        setClozeWithDragAndDropEditorContent={
                          setClozeWithDragAndDropEditorContent
                        }
                        clozeWithDragAndDropTemplateMarkup={
                          clozeWithDragAndDropTemplateMarkup
                        }
                        setClozeWithDragAndDropTemplateMarkup={
                          setClozeWithDragAndDropTemplateMarkup
                        }
                        clozeWithTextEditorContent={clozeWithTextEditorContent}
                        setClozeWithTextEditorContent={
                          setClozeWithTextEditorContent
                        }
                        clozeWithTextTemplateMarkup={
                          clozeWithTextTemplateMarkup
                        }
                        setClozeWithTextTemplateMarkup={
                          setClozeWithTextTemplateMarkup
                        }
                        clozeWithTextMatchAllResponses={
                          clozeWithTextMatchAllResponses
                        }
                        setClozeWithTextMatchAllResponses={
                          setClozeWithTextMatchAllResponses
                        }
                        clozeWithTextCorrectAnswer={clozeWithTextCorrectAnswer}
                        setClozeWithTextCorrectAnswer={
                          setClozeWithTextCorrectAnswer
                        }
                        essayWithRichTextEditorContent={
                          essayWithRichTextEditorContent
                        }
                        setEssayWithRichTextEditorContent={
                          setEssayWithRichTextEditorContent
                        }
                        essayWithRichTextWordLimit={essayWithRichTextWordLimit}
                        setEssayWithRichTextWordLimit={
                          setEssayWithRichTextWordLimit
                        }
                        essayWithRichTextWordLimitType={
                          essayWithRichTextWordLimitType
                        }
                        setEssayWithRichTextWordLimitType={
                          setEssayWithRichTextWordLimitType
                        }
                        removeAnItem={removeQuestion}
                        editAnItem={editQuestion}
                        saveAnItem={editQuestion}
                        audioRecorderEditorContent={audioRecorderEditorContent}
                        setAudioRecorderEditorContent={
                          setAudioRecorderEditorContent
                        }
                        audioRecorderMaximumSecond={audioRecorderMaximumSecond}
                        setAudioRecorderMaximumSecond={
                          setAudioRecorderMaximumSecond
                        }
                        audioRecorderPlayerType={audioRecorderPlayerType}
                        setAudioRecorderPlayerType={setAudioRecorderPlayerType}
                        shortTextEditorContent={shortTextEditorContent}
                        setShortTextEditorContent={setShortTextEditorContent}
                        shortTextPoints={shortTextPoints}
                        setShortTextPoints={setShortTextPoints}
                        shortTextAllow={shortTextAllow}
                        setShortTextAllow={setShortTextAllow}
                        shortTextValue={shortTextValue}
                        setShortTextValue={setShortTextValue}
                        essayWithPlainTextLayoutWordLimit={
                          essayWithPlainTextLayoutWordLimit
                        }
                        setEssayWithPlainTextLayoutWordLimit={
                          setEssayWithPlainTextLayoutWordLimit
                        }
                        essayWithPlainTextLayoutWordType={
                          essayWithPlainTextLayoutWordType
                        }
                        setEssayWithPlainTextLayoutWordType={
                          setEssayWithPlainTextLayoutWordType
                        }
                        essayWithPlainTextLayoutEditorContent={
                          essayWithPlainTextLayoutEditorContent
                        }
                        setEssayWithPlainTextLayoutEditorContent={
                          setEssayWithPlainTextLayoutEditorContent
                        }
                        orderListList={orderListList}
                        setOrderListList={setOrderListList}
                        orderListEditorContent={orderListEditorContent}
                        setOrderListEditorContent={setOrderListEditorContent}
                        matchListPossibleResponses={matchListPossibleResponses}
                        setMatchListPossibleResponses={
                          setMatchListPossibleResponses
                        }
                        matchListStimulusList={matchListStimulusList}
                        setMatchListStimulusList={setMatchListStimulusList}
                        matchListEditorContent={matchListEditorContent}
                        setMatchListEditorContent={setMatchListEditorContent}
                        classificationPossibleResponses={
                          classificationPossibleResponses
                        }
                        setClassificationPossibleResponses={
                          setClassificationPossibleResponses
                        }
                        classificationColumnTitles={classificationColumnTitles}
                        setClassificationColumnTitles={
                          setClassificationColumnTitles
                        }
                        classificationEditorContent={
                          classificationEditorContent
                        }
                        setClassificationEditorContent={
                          setClassificationEditorContent
                        }
                        classificationColumnCount={classificationColumnCount}
                        setClassificationColumnCount={
                          setClassificationColumnCount
                        }
                        classificationRowCount={classificationRowCount}
                        setClassificationRowCount={setClassificationRowCount}

                        editorContent={editorContent}
                        setEditorContent={setEditorContent}
                        multipleChoices={multipleChoices}
                        setMultipleChoices={setMultipleChoices}

                        onSaveQuestion={onSaveQuestion}
                        onRemoveQuestion={removeQuestion}
                        onEditQuestion={editQuestion}
                      />
                    ) : (
                      <SimpleSection
                        QuestionsList={item.QuestionsList}
                        sectionName={item.Section}
                        handleQuestionDragDrop={handleQuestionDragDrop}
                        multipleChoiceschoiceMatric={
                          choiceMatricMultipleChoices
                        }
                        setMultipleChoiceschoiceMatric={
                          setChoiceMatricMultipleChoices
                        }
                        multipleOptionschoiceMatric={
                          choiceMatricMultipleOptions
                        }
                        setMultipleOptionschoiceMatric={
                          setChoiceMatricMultipleOptions
                        }
                        editorContentchoiceMatric={choiceMatricEditorContent}
                        setEditorContentchoiceMatric={
                          setChoiceMatricEditorContent
                        }
                        multipleChoicestrueFalse={trueFalseMultipleChoices}
                        setMultipleChoicestrueFalse={
                          setTrueFalseMultipleChoices
                        }
                        editorContenttrueFalse={trueFalseEditorContent}
                        setEditorContenttrueFalse={setTrueFalseEditorContent}
                        trueFalseShuffleOptiontrueFalse={trueFalseShuffleOption}
                        setTrueFalseShuffleOptiontrueFalse={
                          setTrueFalseShuffleOption
                        }
                        //ubaid
                        clozeWithDropDownMultipleChoices={
                          clozeWithDropDownMultipleChoices
                        }
                        setClozeWithDropDownMultipleChoices={
                          setClozeWithDropDownMultipleChoices
                        }
                        clozeWithDropDownEditorContent={
                          clozeWithDropDownEditorContent
                        }
                        setClozeWithDropDownEditorContent={
                          setClozeWithDropDownEditorContent
                        }
                        clozeWithDropDownTemplateMarkup={
                          clozeWithDropDownTemplateMarkup
                        }
                        setClozeWithDropDownTemplateMarkup={
                          setClozeWithDropDownTemplateMarkup
                        }
                        clozeWithDragAndDropMultipleChoices={
                          clozeWithDragAndDropMultipleChoices
                        }
                        setClozeWithDragAndDropMultipleChoices={
                          setClozeWithDragAndDropMultipleChoices
                        }
                        clozeWithDragAndDropEditorContent={
                          clozeWithDragAndDropEditorContent
                        }
                        setClozeWithDragAndDropEditorContent={
                          setClozeWithDragAndDropEditorContent
                        }
                        clozeWithDragAndDropTemplateMarkup={
                          clozeWithDragAndDropTemplateMarkup
                        }
                        setClozeWithDragAndDropTemplateMarkup={
                          setClozeWithDragAndDropTemplateMarkup
                        }
                        clozeWithTextEditorContent={clozeWithTextEditorContent}
                        setClozeWithTextEditorContent={
                          setClozeWithTextEditorContent
                        }
                        clozeWithTextTemplateMarkup={
                          clozeWithTextTemplateMarkup
                        }
                        setClozeWithTextTemplateMarkup={
                          setClozeWithTextTemplateMarkup
                        }
                        clozeWithTextMatchAllResponses={
                          clozeWithTextMatchAllResponses
                        }
                        setClozeWithTextMatchAllResponses={
                          setClozeWithTextMatchAllResponses
                        }
                        clozeWithTextCorrectAnswer={clozeWithTextCorrectAnswer}
                        setClozeWithTextCorrectAnswer={
                          setClozeWithTextCorrectAnswer
                        }
                        essayWithRichTextEditorContent={
                          essayWithRichTextEditorContent
                        }
                        setEssayWithRichTextEditorContent={
                          setEssayWithRichTextEditorContent
                        }
                        essayWithRichTextWordLimit={essayWithRichTextWordLimit}
                        setEssayWithRichTextWordLimit={
                          setEssayWithRichTextWordLimit
                        }
                        essayWithRichTextWordLimitType={
                          essayWithRichTextWordLimitType
                        }
                        setEssayWithRichTextWordLimitType={
                          setEssayWithRichTextWordLimitType
                        }
                        removeAnItem={removeQuestion}
                        editAnItem={editQuestion}
                        saveAnItem={editQuestion}
                        audioRecorderEditorContent={audioRecorderEditorContent}
                        setAudioRecorderEditorContent={
                          setAudioRecorderEditorContent
                        }
                        audioRecorderMaximumSecond={audioRecorderMaximumSecond}
                        setAudioRecorderMaximumSecond={
                          setAudioRecorderMaximumSecond
                        }
                        audioRecorderPlayerType={audioRecorderPlayerType}
                        setAudioRecorderPlayerType={setAudioRecorderPlayerType}
                        shortTextEditorContent={shortTextEditorContent}
                        setShortTextEditorContent={setShortTextEditorContent}
                        shortTextPoints={shortTextPoints}
                        setShortTextPoints={setShortTextPoints}
                        shortTextAllow={shortTextAllow}
                        setShortTextAllow={setShortTextAllow}
                        shortTextValue={shortTextValue}
                        setShortTextValue={setShortTextValue}
                        essayWithPlainTextLayoutWordLimit={
                          essayWithPlainTextLayoutWordLimit
                        }
                        setEssayWithPlainTextLayoutWordLimit={
                          setEssayWithPlainTextLayoutWordLimit
                        }
                        essayWithPlainTextLayoutWordType={
                          essayWithPlainTextLayoutWordType
                        }
                        setEssayWithPlainTextLayoutWordType={
                          setEssayWithPlainTextLayoutWordType
                        }
                        essayWithPlainTextLayoutEditorContent={
                          essayWithPlainTextLayoutEditorContent
                        }
                        setEssayWithPlainTextLayoutEditorContent={
                          setEssayWithPlainTextLayoutEditorContent
                        }
                        orderListList={orderListList}
                        setOrderListList={setOrderListList}
                        orderListEditorContent={orderListEditorContent}
                        setOrderListEditorContent={setOrderListEditorContent}
                        matchListPossibleResponses={matchListPossibleResponses}
                        setMatchListPossibleResponses={
                          setMatchListPossibleResponses
                        }
                        matchListStimulusList={matchListStimulusList}
                        setMatchListStimulusList={setMatchListStimulusList}
                        matchListEditorContent={matchListEditorContent}
                        setMatchListEditorContent={setMatchListEditorContent}
                        classificationPossibleResponses={
                          classificationPossibleResponses
                        }
                        setClassificationPossibleResponses={
                          setClassificationPossibleResponses
                        }
                        classificationColumnTitles={classificationColumnTitles}
                        setClassificationColumnTitles={
                          setClassificationColumnTitles
                        }
                        classificationEditorContent={
                          classificationEditorContent
                        }
                        setClassificationEditorContent={
                          setClassificationEditorContent
                        }
                        classificationColumnCount={classificationColumnCount}
                        setClassificationColumnCount={
                          setClassificationColumnCount
                        }
                        classificationRowCount={classificationRowCount}
                        setClassificationRowCount={setClassificationRowCount}

                        editorContent={editorContent}
                        setEditorContent={setEditorContent}
                        multipleChoices={multipleChoices}
                        setMultipleChoices={setMultipleChoices}

                        onSaveQuestion={onSaveQuestion}
                        onRemoveQuestion={removeQuestion}
                        onEditQuestion={editQuestion}
                      />
                    )}
                  </div>
                );
              })}
            </DndProvider>
          </div>
          {/* <div className="mt-12">
            <ClozeWithDropDownLayout
              multipleChoices={clozeWithDragAndDropMultipleChoices}
              setMultipleChoices={setClozeWithDragAndDropMultipleChoices}
              editorContent={clozeWithDragAndDropEditorContent}
              setEditorContent={setClozeWithDragAndDropEditorContent}
              templateMarkup={clozeWithDragAndDropTemplateMarkup}
              setTemplateMarkup={setClozeWithDragAndDropTemplateMarkup}
            />
          </div> */}
        </>

        /*   </div> */
      }
    />
  );
};

export default CreateItem;
