import { useState, useEffect } from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from 'app/services/state/State';
import { actions } from 'app/services/state/Reducer';
import { useHistory, useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { saveQuestion, saveItem } from 'app/services/api/ApiManager';
import swal from 'sweetalert';
// import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useForm } from 'react-hook-form';
import _ from '@lodash';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Breadcrumb from '../../fuse-layouts/shared-components/Breadcrumbs';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import ItemConfiguration from './ItemConfiguration';

import TabbedSection from './TabbedSection';
import SimpleSection from './SimpleSection';

const useStyles = makeStyles({
  layoutRoot: {},
});

const defaultValues = { name: '', email: '', subject: '', message: '' };
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
    .split('/')
    .filter((x) => x)[0]
    .split('-')
    .join(' ');
  const classes = useStyles();
  const [{ news, user }, dispatch] = useStateValue();
  const [count, setCount] = useState(0);
  const [editorContent, setEditorContent] = useState('');
  const [multipleChoices, setMultipleChoices] = useState([]);
  const [nameDetails, setNameDetails] = useState('');
  const [descriptionDetails, setDescriptionDetails] = useState('');
  const [statusButtonDetails, setStatusButtonDetails] = useState('');
  const [difficultyButtonDetails, setDifficultyButtonDetails] = useState('');
  const [scoringType, setScoringType] = useState(1);
  const [contentSource, setContentSource] = useState('');
  const [contentNotes, setContentNotes] = useState('');
  const [contentAcknowledgements, setContentAcknowledgements] = useState('');

  const [selectedLayout, setSelectedLayout] = useState('1');
  const [tagsList, setTagsList] = useState([]);
  const [tabsInColumn, setTabsInColumn] = useState(true);
  const [tabsInColumnOne, setTabsInColumnOne] = useState(false);
  const [tabsInColumnTwo, setTabsInColumnTwo] = useState(false);
  const [verticalDivider, setVerticalDivider] = useState(false);
  const [scrollingForLongContent, setScrollingForLongContent] = useState(false);

  const [componentsList, setComponentsList] = useState([]);
  const [componentsStructureList, setComponentsStructureList] = useState([]);

  const [trueFalseShuffleOption, setTrueFalseShuffleOption] = useState(false);
  const [trueFalseEditorContent, setTrueFalseEditorContent] = useState('');
  const [trueFalseMultipleChoices, setTrueFalseMultipleChoices] = useState([
    {
      id: `item-1`,
      position: 0,
      title: 'True',
      isCorrect: false,
      isAlternate: false,
    },
    {
      id: `item-2`,
      position: 1,
      title: 'False',
      isCorrect: false,
      isAlternate: false,
    },
  ]);

  // Choice Matrix start
  const [choiceMatricEditorContent, setChoiceMatricEditorContent] = useState('');
  const [choiceMatricMultipleChoices, setChoiceMatricMultipleChoices] = useState([
    {
      id: `item-1}`,
      position: 0,
      title: '',
      isCorrect: false,
      isAlternate: false,
    },
    {
      id: `item-2`,
      position: 1,
      title: '',
      isCorrect: false,
      isAlternate: false,
    },
    {
      id: `item-3`,
      position: 2,
      title: '',
      isCorrect: false,
      isAlternate: false,
    },
    {
      id: `item-4`,
      position: 3,
      title: '',
      isCorrect: false,
      isAlternate: false,
    },
  ]);
  const [choiceMatricMultipleOptions, setChoiceMatricMultipleOptions] = useState([
    {
      id: `item-1}`,
      position: 0,
      title: 'True',
      isCorrect: false,
      isAlternate: false,
    },
    {
      id: `item-2`,
      position: 1,
      title: 'False',
      isCorrect: false,
      isAlternate: false,
    },
  ]);
  // Choice Matrix end
  const setNews = async () => {
    dispatch({
      type: actions.SET_NEWS,
      payload: { header: 'new header text', des: 'new description text' },
    });
  };

  const { control, handleSubmit, watch, formState } = useForm({
    mode: 'onChange',
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
  const onSaveQuestion = async () => {
    try {
      const finalItemObject = {
        description: editorContent,
        options: multipleChoices,
        itemId: '1eff4c49-fcb1-432e-83c8-c5a0023ee5e0',
        questionType: 'simple-mcqs',
      };
      if (editorContent === '' || editorContent === '<p></p>\n') {
        swal({
          title: 'Error!',
          text: 'Question Description is Required!',
          icon: 'error',
          button: 'Ok!',
        });
      }
      if (multipleChoices === [] || multipleChoices.length === 0) {
        swal({
          title: 'Error!',
          text: 'Multiple Choice Options are Required!',
          icon: 'error',
          button: 'Ok!',
        });
      } else {
        const res = await saveQuestion(
          finalItemObject,
          '1eff4c49-fcb1-432e-83c8-c5a0023ee5e0',
          user
        );

        if (res && res.data && res.data.status === 'success') {
          swal({
            title: 'Good job!',
            text: 'Question Saved Successfully!',
            icon: 'success',
            button: 'Ok!',
          }).then((value) => {
            setEditorContent('');
            setMultipleChoices([]);
            console.log('saved successfully');
            redirectTo('/all-questions');
          });
        }
      }
    } catch (error) {
      swal({
        title: 'Error!',
        text: 'Something Went Wrong,Please Contact Admin!',
        icon: 'error',
        button: 'Ok!',
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
        organizationId:
          user && user.organization && user.organization.id ? user.organization.id : '', // '37cb22ba-fdb4-478f-b0d3-35312134e7ec',
      };
      if (nameDetails === '') {
        swal({
          title: 'Error!',
          text: 'Name is Required!',
          icon: 'error',
          button: 'Ok!',
        });
      }
      if (descriptionDetails === '') {
        swal({
          title: 'Error!',
          text: 'Description is Required!',
          icon: 'error',
          button: 'Ok!',
        });
      } else {
        const res = await saveItem(itemObject, user);

        if (res && res.data && res.data.status === 'success') {
          swal({
            title: 'Good job!',
            text: 'Item Saved Successfully!',
            icon: 'success',
            button: 'Ok!',
          }).then((value) => {
            setEditorContent('');
            setMultipleChoices([]);
            console.log('saved successfully');
            //  redirectTo('/all-questions');
          });
        }
      }
    } catch (error) {
      swal({
        title: 'Error!',
        text: 'Something Went Wrong, Please Contact Admin!',
        icon: 'error',
        button: 'Ok!',
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
      title: '',
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
    onNewTabAdded('A', 1);
  };

  useEffect(() => {
    getItemLayout();
    /*  setComponentsStructureList([
      {
        Section: "A",
        Layout: "12",
        Tabs: [
          { TabName: "First Tab", QuestionsList: [], Layout: "12" },
          { TabName: "Second Tab", QuestionsList: [], Layout: "12" },
        ],
      },
      {
        section: "B",
        Layout: "12",
        Tabs: [{ TabName: "Third Tab", QuestionsList: [], Layout: "12" }],
      },
    ]); */
  }, []);

  function onNewTabAdded(section, title) {
    const tab = { TabName: title, QuestionsList: [], Layout: '12' };
    const comp = componentsStructureList;
    comp.forEach((item) => {
      if (item.Section === section) {
        item.Tabs.push(tab);
      }
    });
    setComponentsStructureList([...comp]);
    console.log('comp ', comp);
    console.log('componentsStructureList ', componentsStructureList);
    // let tabs=comp.Tabs;
    // choices = multipleChoices;
    // comp.push(option);
    // setMultipleChoices(choices);
  }

  function handleQuestionDragDrop(sectionname, tabname) {
    const question = { component: 'new Question' };
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
    setComponentsStructureList([...comp]);
    console.log('comp ', comp);
    console.log('componentsStructureList ', componentsStructureList);
    // let tabs=comp.Tabs;
    // choices = multipleChoices;
    // comp.push(option);
    // setMultipleChoices(choices);
  }

  function getItemLayout() {
    const section = [];
    if (selectedLayout === '1') {
      if (tabsInColumn === true) {
        section.push({
          Section: 'A',
          Layout: '12',
          isTabbed: true,
          Tabs: [{ TabName: 'Tab 1', QuestionsList: [], Layout: '12' }],
        });
      } else {
        section.push({
          Section: 'A',
          Layout: '12',
          isTabbed: false,
          QuestionsList: [],
        });
      }
    } else {
      if (tabsInColumnOne === true) {
        section.push({
          Section: 'A',
          Layout: '6',
          isTabbed: true,
          Tabs: [{ TabName: 'Tab 1', QuestionsList: [], Layout: '12' }],
        });
      } else {
        section.push({
          Section: 'A',
          Layout: '6',
          isTabbed: false,
          QuestionsList: [],
        });
      }
      if (tabsInColumnTwo === true) {
        section.push({
          Section: 'B',
          Layout: '6',
          isTabbed: true,
          Tabs: [{ TabName: 'Tab 1', QuestionsList: [], Layout: '12' }],
        });
      } else {
        section.push({
          Section: 'B',
          Layout: '6',
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
    if (selectedLayout === '1') {
      if (tabsInColumn === true) {
        section.push({
          Section: 'A',
          Layout: '12',
          isTabbed: true,
          Tabs: [{ TabName: 'Tab 1', QuestionsList: questions, Layout: '12' }],
        });
      } else {
        section.push({
          Section: 'A',
          Layout: '12',
          isTabbed: false,
          QuestionsList: questions,
        });
      }
    } else {
      if (tabsInColumnOne === true) {
        section.push({
          Section: 'A',
          Layout: '6',
          isTabbed: true,
          Tabs: [{ TabName: 'Tab 1', QuestionsList: questions, Layout: '12' }],
        });
      } else {
        section.push({
          Section: 'A',
          Layout: '6',
          isTabbed: false,
          QuestionsList: questions,
        });
      }
      if (tabsInColumnTwo === true) {
        section.push({
          Section: 'B',
          Layout: '6',
          isTabbed: true,
          Tabs: [{ TabName: 'Tab 1', QuestionsList: [], Layout: '12' }],
        });
      } else {
        section.push({
          Section: 'B',
          Layout: '6',
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
    console.log('updated section is ', section);
  }

  useEffect(() => {
    handleLayoutChange();
  }, [selectedLayout, tabsInColumn, tabsInColumnOne, tabsInColumnTwo]);

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
              color: '#000',
              fontWeight: 700,
              mt: 2,
              textTransform: 'capitalize',
            }}
          >
            Create New Question
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ float: 'right' }}
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
              <div className="flex flex-col w-full max-w-4xl" /* style={{ width: '40%' }} */>
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

              {/*  <div
                className="flex flex-col w-full max-w-4xl p-20"
                style={{ paddingRight: '2%', paddingLeft: '2%' }}
              >
                {console.log('componentsList in render ', componentsList)}
                {componentsList.map((item, index) => {
                  return (
                    <>
                      {console.log('item ', item)}
                      <CreateQuestion key={index} />;
                    </>
                  );
                })}
              </div> */}
              {componentsStructureList.map((item, index) => {
                return (
                  <div
                    className="flex flex-col w-full max-w-4xl p-20"
                    style={{ paddingRight: '2%', paddingLeft: '2%' }}
                  >
                    {item.isTabbed === true ? (
                      <TabbedSection
                        TabsList={item.Tabs}
                        sectionName={item.Section}
                        handleNewTab={onNewTabAdded}
                        handleQuestionDragDrop={handleQuestionDragDrop}
                      />
                    ) : (
                      <>
                        <SimpleSection
                          QuestionsList={item.QuestionsList}
                          sectionName={item.Section}
                          handleQuestionDragDrop={handleQuestionDragDrop}
                        />
                        {/* {item.QuestionsList.map((q, i) => {
                          return <CreateQuestion key={i} />;
                        })} */}
                      </>
                    )}
                  </div>
                );
              })}
            </DndProvider>
          </div>

          {/*  <div className="mt-12">
            <LabelImageWithDragDropLayout
              multipleChoices={choiceMatricMultipleChoices}
              setMultipleChoices={setChoiceMatricMultipleChoices}
              multipleOptions={choiceMatricMultipleOptions}
              setMultipleOptions={setChoiceMatricMultipleOptions}
              editorContent={choiceMatricEditorContent}
              setEditorContent={setChoiceMatricEditorContent}
            />
          </div> */}
        </>

        /*   </div> */
      }
    />
  );
};

export default CreateItem;
