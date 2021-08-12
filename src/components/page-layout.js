import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

import { MdMenu } from 'react-icons/md';
// import { BsLink45Deg, BsLockFill } from 'react-icons/bs';
import { SiJava, SiJavascript, SiPython } from 'react-icons/si';
// import { VscJson } from 'react-icons/vsc';
import { FaGithub, FaHome } from 'react-icons/fa';
import { GoSignOut } from 'react-icons/go';
import { Link, useLocation } from 'react-router-dom';
// import CppQuiz from './Cpp/CppQuiz';
// import JavaQuiz from './Java/JavaQuiz';
// import JavaScriptQuiz from './JavaScript/JavaScriptQuiz';
// import PythonQuiz from './Python/PythonQuiz';
import { useSelector, useDispatch } from 'react-redux';
import { setCollapseStatus } from '../features/sidebar/sidebarSlice';
// import { path as hashPath, pageName as hashPageName } from './hash-page';
// import { path as hmacPath, pageName as hmacPageName } from './hmac-page';
// import { path as cipherPath, pageName as cipherPageName } from './cipher-page';
// import { path as jwePath, pageName as jwePageName } from './jwe-page';
// import { path as urlPath, pageName as urlPageName } from './url-page';
// import { path as base64Path, pageName as base64PageName } from './base64-page';
// import { path as jsonPath, pageName as jsonPageName } from './json-page';
// import { path as pbkdf2Path, pageName as pbkdf2PageName } from './pbkdf2-page';
import firebase from './firebase';
const PageLayout = (props) => {
  const location = useLocation();

  const isJavaQuiz = () => location.pathname === 'CppQuiz';
  const isJavaScriptQuiz = () => location.pathname === 'JavaScriptQuiz';
  const isCppQuiz = () => location.pathname === 'CppQuiz';
  const isPythonQuiz = () => location.pathname === 'PythonQuiz';
  const ishome = () => location.pathname === 'Home';

  const textIcon = (text) => <strong className='m-0 arial'>{text}</strong>;
  const status = useSelector((state) => state.sidebar.collapseStatus);
  const dispatch = useDispatch();

  const signOut = () => {
    firebase.auth().signOut();
  };
  return (
    <div className='layout'>
      <aside style={{ display: 'flex' }}>
        <ProSidebar collapsed={status} style={{ height: '100vh' }}>
          <SidebarHeader>
            <Menu iconShape='square'>
              <MenuItem
                icon={<MdMenu />}
                onClick={() => {
                  dispatch(setCollapseStatus(!status));
                }}
              >
                Online Quiz
              </MenuItem>
            </Menu>
          </SidebarHeader>
          <Menu iconShape='square'>
            <MenuItem icon={<FaHome />} active={ishome()}>
              <Link to='/'>Home</Link>
            </MenuItem>
            <MenuItem icon={textIcon('C++')} active={isCppQuiz()}>
              <Link to='/cppquiz'>Cpp Quiz</Link>
            </MenuItem>
            <MenuItem icon={<SiJava />} active={isJavaQuiz()}>
              <Link to='/javaquiz'>Java Quiz</Link>
            </MenuItem>
            <MenuItem icon={<SiPython />} active={isPythonQuiz()}>
              <Link to={'/pythonquiz'}>Python Quiz</Link>
            </MenuItem>
            <MenuItem icon={<SiJavascript />} active={isJavaScriptQuiz()}>
              <Link to='/javascriptquiz'>JavaScript Quiz</Link>
            </MenuItem>
          </Menu>
          <SidebarFooter>
            <Menu iconShape='square'>
              <MenuItem icon={<FaGithub />}>
                <a href='https://github.com/PiyushIngale007/Multiplayer-Quiz/'>
                  View Source
                </a>
              </MenuItem>
              {/* <MenuItem icon={<FaLinkedinIn />}>
                <a href='https://www.linkedin.com/in/donato-rimenti-764876132/'>
                  Author
                </a>
              </MenuItem> */}
            </Menu>
            <Menu iconShape='square'>
              <MenuItem icon={<GoSignOut />} onClick={() => signOut()}>
                <Link to='/login'>Sign Out</Link>
              </MenuItem>
              {/* <MenuItem icon={<FaLinkedinIn />}>
                <a href='https://www.linkedin.com/in/donato-rimenti-764876132/'>
                  Author
                </a>
              </MenuItem> */}
            </Menu>
          </SidebarFooter>
        </ProSidebar>
        <main className='content' style={{ width: '100%' }}>
          <div>{props.children}</div>
        </main>
      </aside>
    </div>
  );
};

export default PageLayout;
