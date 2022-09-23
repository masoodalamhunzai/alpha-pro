import { makeStyles } from '@material-ui/core/styles';

import { primaryBlueColor } from 'app/services/Settings';
import Switch from 'app/shared-components/Switch';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: 20,
  },
  defaultLayout: {
    border: 'none',
    cursor: 'pointer',
  },
  selectedLayout: {
    border: `2px solid ${primaryBlueColor}`,
    cursor: 'pointer',
  },
}));

function LayoutConfiguration(props) {
  const classes = useStyles();
  // todo: remove following code if not used
  // const [expanded, setExpanded] = useState(false);

  // todo: remove following code if not used
  // const handleChange = (panel) => (event, isExpanded) => {
  //   setExpanded(isExpanded ? panel : false);
  // };

  const {
    selectedLayout = '',
    verticalDivider = false,
    tabsInColumn = false,
    tabsInColumnOne = false,
    tabsInColumnTwo = false,
    scrollingForLongContent = false,
  } = props || {};

  return (
    <>
      {/*  <div style={{ border: "2px solid", width: "100%", maxWidth: "350px" }}> */}
      <div style={{ width: '100%' }}>
        <div className="w-full">
          <div className="flex flex-wrap">
            <div style={{ padding: '1% 2%', width: '50%' }}>
              <div
                className={
                  selectedLayout === '1'
                    ? `flex flex-col items-center ${classes.selectedLayout}`
                    : `flex flex-col items-center ${classes.defaultLayout}`
                }
                onClick={() => {
                  props.setSelectedLayout('1');
                  props.setTabsInColumnOne(false);
                  props.setTabsInColumnTwo(false);
                }}
                aria-hidden
              >
                <img
                  style={{ width: '100%', height: '100px' }}
                  src="assets/images/uicapture/StandardIcon.png"
                  alt="Standard MCQ"
                />
                <text className="my-4">Single Column</text>
              </div>
            </div>

            <div style={{ padding: '1% 2%', width: '50%' }}>
              <div
                className={
                  selectedLayout === '50%'
                    ? `flex flex-col items-center ${classes.selectedLayout}`
                    : `flex flex-col items-center ${classes.defaultLayout}`
                }
              >
                <div
                  className="flex"
                  onClick={() => {
                    props.setSelectedLayout('50%');
                    props.setTabsInColumn(false);
                  }}
                  aria-hidden
                >
                  <img
                    style={{
                      width: '50%',
                      height: '100px',
                      paddingRight: '2px',
                    }}
                    src="assets/images/uicapture/MultipleIcon.png"
                    alt="Multiple Icon"
                  />
                  <img
                    style={{
                      width: '50%',
                      height: '100px',
                      paddingLeft: '2px',
                    }}
                    src="assets/images/uicapture/MultipleIcon.png"
                    alt="Multiple Icon"
                  />
                </div>
                <text className="my-4">50%-50%</text>
              </div>
            </div>

            <div style={{ padding: '1% 2%', width: '50%' }}>
              <div
                className={
                  selectedLayout === '30%,70%'
                    ? `flex ${classes.selectedLayout}`
                    : `flex ${classes.defaultLayout}`
                }
                onClick={() => {
                  props.setSelectedLayout('30%,70%');
                  props.setTabsInColumn(false);
                }}
                aria-hidden
              >
                <div style={{ width: '34%' }} className="flex flex-col items-center">
                  <img
                    style={{
                      width: '100%',
                      height: '100px',
                      paddingRight: '2px',
                    }}
                    src="assets/images/uicapture/TrueFalseIcon.png"
                    alt="True false MCQ"
                  />
                  <text className="my-4">30%</text>
                </div>
                <div style={{ width: '66%' }} className="flex flex-col items-center justfy-center">
                  <img
                    style={{
                      width: '100%',
                      height: '100px',
                      paddingLeft: '2px',
                    }}
                    src="assets/images/uicapture/TrueFalseIcon.png"
                    alt="True false MCQ"
                  />
                  <text className="my-4">70%</text>
                </div>
              </div>
            </div>

            <div style={{ padding: '1% 2%', width: '50%' }}>
              <div
                className={
                  selectedLayout === '70%,30%'
                    ? `flex ${classes.selectedLayout}`
                    : `flex ${classes.defaultLayout}`
                }
                onClick={() => {
                  props.setSelectedLayout('70%,30%');
                  props.setTabsInColumn(false);
                }}
                aria-hidden
              >
                <div style={{ width: '66%' }} className="flex flex-col items-center">
                  <img
                    style={{
                      width: '100%',
                      height: '100px',
                      paddingRight: '2px',
                    }}
                    src="assets/images/uicapture/TrueFalseIcon.png"
                    alt="True false MCQ"
                  />
                  <text className="my-4">70%</text>
                </div>
                <div style={{ width: '34%' }} className="flex flex-col items-center justfy-center">
                  <img
                    style={{
                      width: '100%',
                      height: '100px',
                      paddingLeft: '2px',
                    }}
                    src="assets/images/uicapture/TrueFalseIcon.png"
                    alt="True false MCQ"
                  />
                  <text className="my-4">30%</text>
                </div>
              </div>
            </div>

            <div style={{ padding: '1% 2%', width: '50%' }}>
              <div
                className={
                  selectedLayout === '40%,60%'
                    ? `flex ${classes.selectedLayout}`
                    : `flex ${classes.defaultLayout}`
                }
                onClick={() => {
                  props.setSelectedLayout('40%,60%');
                  props.setTabsInColumn(false);
                }}
                aria-hidden
              >
                <div style={{ width: '40%' }} className="flex flex-col items-center">
                  <img
                    style={{
                      width: '100%',
                      height: '100px',
                      paddingRight: '2px',
                    }}
                    src="assets/images/uicapture/TrueFalseIcon.png"
                    alt="True false MCQ"
                  />
                  <text className="my-4">40%</text>
                </div>
                <div style={{ width: '60%' }} className="flex flex-col items-center justfy-center">
                  <img
                    style={{
                      width: '100%',
                      height: '100px',
                      paddingLeft: '2px',
                    }}
                    src="assets/images/uicapture/TrueFalseIcon.png"
                    alt="True false MCQ"
                  />
                  <text className="my-4">60%</text>
                </div>
              </div>
            </div>

            <div style={{ padding: '1% 2%', width: '50%' }}>
              <div
                className={
                  selectedLayout === '60%,40%'
                    ? `flex ${classes.selectedLayout}`
                    : `flex ${classes.defaultLayout}`
                }
                onClick={() => {
                  props.setSelectedLayout('60%,40%');
                  props.setTabsInColumn(false);
                }}
                aria-hidden
              >
                <div style={{ width: '60%' }} className="flex flex-col items-center">
                  <img
                    style={{
                      width: '100%',
                      height: '100px',
                      paddingRight: '2px',
                    }}
                    src="assets/images/uicapture/TrueFalseIcon.png"
                    alt="True false MCQ"
                  />
                  <text className="my-4">60%</text>
                </div>
                <div style={{ width: '40%' }} className="flex flex-col items-center justfy-center">
                  <img
                    style={{
                      width: '100%',
                      height: '100px',
                      paddingLeft: '2px',
                    }}
                    src="assets/images/uicapture/TrueFalseIcon.png"
                    alt="True false MCQ"
                  />
                  <text className="my-4">40%</text>
                </div>
              </div>
            </div>
          </div>

          <div className="divider" />
          <div>
            <div>
              <label className="fs-16">
                <b>Column Options</b>
              </label>
            </div>
            <div>
              {selectedLayout == '1' ? (
                <div className="flex justify-between items-center">
                  <label className="fs-14">Tabs in Column</label>
                  <Switch
                    checked={tabsInColumn}
                    onChange={() => props.setTabsInColumn(!tabsInColumn)}
                  />
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <label className="fs-14">Tabs in Column One</label>
                    <Switch
                      checked={tabsInColumnOne}
                      onChange={() => props.setTabsInColumnOne(!props.tabsInColumnOne)}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <label className="fs-14">Tabs in Column Two</label>
                    <Switch
                      checked={tabsInColumnTwo}
                      onChange={() => props.setTabsInColumnTwo(!props.tabsInColumnTwo)}
                    />
                  </div>
                </>
              )}
              {/* <div className="flex justify-between items-center">
                <label className="fs-14">Tabs in Column</label>
                <Switch />
              </div> */}

              <div className="flex justify-between items-center">
                <label className="fs-14">Vertical Divider</label>
                <Switch
                  checked={verticalDivider}
                  onChange={() => props.setVerticalDivider(!props.verticalDivider)}
                />
              </div>

              <div className="flex justify-between items-center">
                <label className="fs-14">Scrolling For Long Content</label>
                <Switch
                  checked={scrollingForLongContent}
                  onChange={() => props.setScrollingForLongContent(!props.scrollingForLongContent)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LayoutConfiguration;
