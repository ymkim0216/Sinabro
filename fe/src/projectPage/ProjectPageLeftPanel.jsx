import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faCalendar, faPlusCircle, faTimesCircle, faSpinner, faCheck } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko, tr } from 'date-fns/locale'
import { useDispatch, useSelector } from 'react-redux';
import { changeProjectCalenderState, toggleProjectCalenderState } from '../store/projectCalenderSlice';
import { addToDoList, changeState, delToDOlist, removeToDoItem, setToDoList } from '../store/toDoListSlice';
import { changeScheduleModalState } from '../store/addScheduleModalHandleSlice';
import './style.css'
import axios from 'axios';
import getEnv from '../utils/getEnv';

const ProjectPageLeftPanelContainer = styled.div`
    height: 100%;
    width: 30%;
    display: flex;
    flex-direction: column;
    border-right: 2px solid #B8B8B8;
    background-color: ${({ isDark }) => (isDark ? 'white' : '#404040')};
`;

const ProjectPageLeftPanelClosedContainer = styled.div`
    height: 100%;
    width: 2%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #564CAD;
    border-right: 2px solid #B8B8B8;
`;

const ProjectNameBox = styled.div`
    height: 6%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 1rem;
    margin-right: 1rem;
    border-bottom: 2px solid #B8B8B8;
    font-weight: bold;
    color: ${({ isDark }) => isDark ? '#564CAD' : 'white'};
`;

const CalendarBox = styled.div`
    height: 4%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 1.2rem;
    margin-right: 1.2rem;
    font-weight: bold;
    color: ${({ isDark }) => isDark ? '#564CAD' : 'white'};
`;

const ToDoListBox = styled.div`
    height: 90%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    margin: 2rem 1rem;
    margin-right: 0.5rem;
`;

const TodayBox = styled.div`
    display: flex;
    flex-direction: column;
`;

const DayText = styled.div`
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: ${({ isDark }) => !isDark ? 'white' : '#535353'};
`;

const ListBox = styled.div`
    padding: 0 0 0 1rem;
    border-left: 5px solid #3EC8AF;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
`;

const ContentBox = styled.div`
    height: 4.5rem;
    width: 95%;
    display: flex;
    border-left: 1rem solid #3EC8AF;
    border-radius: 0.5rem;
    transition: transform 0.3s ease;
    &:hover {
        transform: scale(1.05);
    }
`

const UserImg = styled.img`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: 1px solid black;
    align-self: center;
    margin: 0.5rem;
`

const InnerTextBox = styled.div`
    height: 100%;
    width: 70%;
    display: flex;
    flex-direction: column;
    font-size: 0.55rem;
    font-weight: bold;
    justify-content: center;
`

const IconBox = styled.div`
    height: '100%';
    width: 20%;
    display: flex;
    flex-direction: column;
`

const IconHoverBox = styled.div`
    transition: transform 0.3 ease;
    &:hover{
        transform: scale(1.2)
    }
`

const CustomModal = styled(Modal)`
  .modal-content {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }

  .modal-header {
    border-bottom: none;
    padding-top: 20px;
    padding-bottom: 0;
  }

  .modal-title {
    font-weight: bold;
    color: #564cad;
  }

  .modal-body {
    padding: 20px;
  }

  .modal-footer {
    border-top: none;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .btn-secondary {
    background-color: #564cad;
    border: none;
    border-radius: 5px;
    padding: 8px 20px;
    font-weight: bold;
  }

  .btn-primary {
    background-color: #3ec8af;
    border: none;
    border-radius: 5px;
    padding: 8px 20px;
    font-weight: bold;
  }

  .btn-primary:hover {
    background-color: #31a890;
  }
`

const ProjectPageLeftPanel = () => {
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [toDoText, setToDoText] = useState('')
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    // const [selectedWorker, setSelectedWorker] = useState(''); // 자기 일정만 추가할 수 있음
    const dispatch = useDispatch();

    const toDoList = useSelector(state => (state.toDoList.value))

    const modalState = useSelector(state => (state.addScheduleModalHandle.value))

    const isDark = !useSelector(state => state.isDark.isDark)

    const projectRoomId = useSelector(state => state.projectRoomId.value)
    const userInfo = useSelector(state => state.user)

    useEffect(() => {
        if (modalState) {
            handleShowModal()
        }
        else {
            handleCloseModal()
        }
    }, [modalState])

    useEffect(() => {
        const setProjectSchedules = async () => {
            try {
                const res = await axios.get(`${back_url}/schedules/${projectRoomId}`) // 쿠키 되면 제대로 받아지는지 확인
                dispatch(setToDoList(res.data.result))
            }
            catch (err) {
                console.error(err)
            }
        }
        setProjectSchedules()
        return () => {
            dispatch(delToDOlist()) // 언마운트시 리덕스에 저장된 일정 삭제
        }
    }, [])

    const handleSidePanel = () => {
        setIsSidePanelOpen(!isSidePanelOpen)
    };

    const handleCloseModal = () => {
        setShowModal(false)
        dispatch(changeScheduleModalState(false))
    };

    const handleShowModal = () => {
        setShowModal(true)
        dispatch(changeProjectCalenderState(true))
        setToDoText('')
        // setSelectedWorker('') // 자기 일정만 추가할 수 있음
        setStartDate(null)
        setEndDate(null)
    };

    // const workers = ['worker1', 'worker2']

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str
    }

    // const handleWorkerSelectChange = (e) => { // 자기 일정만 추가할 수 있음
    //     setSelectedWorker(e.target.value);
    // };

    const back_url = getEnv('BACK_URL')

    const addSchedule = async () => {
        if (toDoText !== '' && startDate !== null && endDate !== null) {
            // const schedule = {
            //     projectId: projectRoomId,
            //     managerId: userInfo.currentUser.uid,
            //     calenderStartDt: startDate,
            //     calenderEndDt: endDate,
            //     calenderName: toDoText,
            //     subCategoryId: 502,
            //     memberImg: userInfo.currentUser.photoURL,
            //     memberName: userInfo.currentUser.displayName,
            // }

            // dispatch(addToDoList(schedule)) // 스케쥴 제대로 받아올 수 있으면 주석처리된 코드는 필요없음

            try {
                const res = await axios.post(`${back_url}/schedules`, { // 쿠키 되면 제대로 받아지는지 확인
                    projectId: projectRoomId, 
                    managerId: userInfo.currentUser.uid,
                    calenderStartDt: startDate,
                    calenderEndDt: endDate,
                    calenderName: toDoText,
                })
                console.log(res.data)
            }
            catch (err) {
                console.error(err)
            }

            try {
                const res = await axios.get(`${back_url}/schedules/${projectRoomId}`)
                dispatch(setToDoList(res.data.result))
            }
            catch (err) {
                console.error(err)
            }

            handleCloseModal()
        }
    }

    const removeSchedule = async (idx) => {
        try {
            const res = await axios.delete(`${back_url}/schedules`, { // 제대로 작동하는지 확인
                calenderId: toDoList[idx].calenderId,
                projectId: projectRoomId
            })
            console.log(res.data)
        }
        catch (err) {
            console.error(err)
        } 

        dispatch(removeToDoItem(idx))
    }

    const fromatDated = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고, 두 자리로 만들기 위해 padStart 사용
        const day = date.getDate().toString().padStart(2, '0'); // 일도 두 자리로 만들기 위해 padStart 사용
        return `${month}.${day}`;
    }

    return (
        <>
            {isSidePanelOpen ? (
                <ProjectPageLeftPanelContainer isDark={isDark} className='hide-all-panel'>
                    <ProjectNameBox isDark={isDark}>
                        Project Name
                        <IconHoverBox>
                            <FontAwesomeIcon icon={faChevronLeft} onClick={handleSidePanel} style={{ cursor: 'pointer' }} />
                        </IconHoverBox>
                    </ProjectNameBox>
                    <CalendarBox isDark={isDark}>
                        <IconHoverBox>
                            <FontAwesomeIcon icon={faCalendar} onClick={() => dispatch(toggleProjectCalenderState())} style={{ cursor: 'pointer' }} />
                        </IconHoverBox>
                        <IconHoverBox>
                            <FontAwesomeIcon icon={faPlusCircle} onClick={handleShowModal} style={{ cursor: 'pointer' }} />
                        </IconHoverBox>
                    </CalendarBox>
                    <ToDoListBox>
                        <TodayBox>
                            {/* <button onClick={() => dispatch(delToDOlist())}>test</button> */}
                            {/* toDoList 삭제 버튼 */}
                            <DayText isDark={isDark}>오늘 할 일</DayText>
                            <ListBox>
                                {/* 오늘의 할 일 목록 출력 */}
                                {toDoList.map((item, index) => {
                                    const itemStartDate = item.calenderStartDt ? new Date(item.calenderStartDt) : null
                                    const itemEndDate = item.calenderEndDt ? new Date(item.calenderEndDt) : null
                                    const today = new Date()
                                    today.setHours(0, 0, 0, 0)

                                    // start와 end가 모두 유효한 경우에만 처리
                                    if (itemStartDate && itemEndDate) {
                                        // 오늘 날짜인 경우에만 출력
                                        if (itemStartDate <= today && today <= itemEndDate) {
                                            return (
                                                <ContentBox className='shadow' key={index} style={{ backgroundColor: 'white' }} onClick={() => dispatch(changeProjectCalenderState(true))}>
                                                    <UserImg src={item.memberImg} />
                                                    <InnerTextBox className='hide-content-text'>
                                                        <div style={{ fontSize: '1rem' }}>{truncate(item.calenderName, 10)}</div>
                                                        <div>{item.memberName}</div>
                                                        <div>{fromatDated(itemStartDate)} ~ {fromatDated(itemEndDate)}</div>
                                                    </InnerTextBox>
                                                    <IconBox>
                                                        <IconHoverBox style={{ marginLeft: 'auto', marginTop: '0.2rem', marginRight: '0.2rem', color: '#3EC8AF', cursor: 'pointer' }} >
                                                            <FontAwesomeIcon icon={faTimesCircle} onClick={() => dispatch(removeSchedule(index))} />
                                                        </IconHoverBox>
                                                        {item.subCategoryId === 501 ?
                                                            <IconHoverBox style={{ marginTop: 'auto', marginBottom: '1rem', color: '#564CAD', cursor: 'pointer' }}>
                                                                <FontAwesomeIcon icon={faCheck} onClick={() => dispatch(changeState({ index: index, changeValue: 502 }))} />
                                                            </IconHoverBox>
                                                            :
                                                            <IconHoverBox style={{ marginTop: 'auto', marginBottom: '1rem', color: '#564CAD', cursor: 'pointer' }}>
                                                                <FontAwesomeIcon icon={faSpinner} onClick={() => dispatch(changeState({ index: index, changeValue: 501 }))} />
                                                            </IconHoverBox>
                                                        }
                                                    </IconBox>
                                                </ContentBox>
                                            )
                                        } else {
                                            return null // 오늘 날짜가 아닌 경우는 출력하지 않음
                                        }
                                    } else {
                                        return null // start 또는 end가 유효하지 않은 경우는 출력하지 않음
                                    }
                                })}
                            </ListBox>
                        </TodayBox>
                        <TodayBox>
                            <DayText isDark={isDark}>내일 할 일</DayText>
                            <ListBox>
                                {toDoList.map((item, index) => {
                                    const itemStartDate = item.calenderStartDt ? new Date(item.calenderStartDt) : null
                                    const itemEndDate = item.calenderEndDt ? new Date(item.calenderEndDt) : null
                                    const tomorrow = new Date()
                                    tomorrow.setDate(tomorrow.getDate() + 1) // 내일 날짜로 설정
                                    tomorrow.setHours(0, 0, 0, 0); // 시간을 0시 0분 0초로 설정
                                    // start와 end가 모두 유효한 경우에만 처리
                                    if (itemStartDate && itemEndDate) {
                                        // 내일 날짜인 경우에만 출력
                                        if (itemStartDate <= tomorrow && tomorrow <= itemEndDate) {
                                            return (
                                                <ContentBox className='shadow' key={index} style={{ backgroundColor: 'white' }} onClick={() => dispatch(changeProjectCalenderState(true))}>
                                                    <UserImg src={item.memberImg} />
                                                    <InnerTextBox className='hide-content-text'>
                                                        <div style={{ fontSize: '1rem' }}>{truncate(item.calenderName, 10)}</div>
                                                        <div>{item.memberName}</div>
                                                        <div>{fromatDated(itemStartDate)} ~ {fromatDated(itemEndDate)}</div>
                                                    </InnerTextBox>
                                                    <IconBox>
                                                        <IconHoverBox style={{ marginLeft: 'auto', marginTop: '0.2rem', marginRight: '0.2rem', color: '#3EC8AF', cursor: 'pointer' }} >
                                                            <FontAwesomeIcon icon={faTimesCircle} onClick={() => dispatch(removeSchedule(index))} />
                                                        </IconHoverBox>
                                                        {item.subCategoryId === 501 ?
                                                            <IconHoverBox style={{ marginTop: 'auto', marginBottom: '1rem', color: '#564CAD', cursor: 'pointer' }}>
                                                                <FontAwesomeIcon icon={faCheck} onClick={() => dispatch(changeState({ index: index, changeValue: 502 }))} />
                                                            </IconHoverBox>
                                                            :
                                                            <IconHoverBox style={{ marginTop: 'auto', marginBottom: '1rem', color: '#564CAD', cursor: 'pointer' }}>
                                                                <FontAwesomeIcon icon={faSpinner} onClick={() => dispatch(changeState({ index: index, changeValue: 501 }))} />
                                                            </IconHoverBox>
                                                        }
                                                    </IconBox>
                                                </ContentBox>
                                            )
                                        } else {
                                            return null // 내일 날짜가 아닌 경우는 출력하지 않음
                                        }
                                    } else {
                                        return null // start 또는 end가 유효하지 않은 경우는 출력하지 않음
                                    }
                                })}
                            </ListBox>
                        </TodayBox>
                    </ToDoListBox>
                </ProjectPageLeftPanelContainer>
            ) : (
                <ProjectPageLeftPanelClosedContainer>
                    <IconHoverBox>
                        <FontAwesomeIcon icon={faChevronRight} onClick={handleSidePanel} style={{ cursor: 'pointer' }} />
                    </IconHoverBox>
                </ProjectPageLeftPanelClosedContainer>
            )}
            {showModal ?
                <CustomModal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>할 일 추가</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group style={{ marginBottom: '1rem' }}>
                            <Form.Label>할 일</Form.Label>
                            <Form.Control type="text" placeholder="할 일을 입력하세요" value={toDoText} onChange={e => setToDoText(e.target.value)} />
                        </Form.Group>
                        {/* <Form.Group style={{ marginBottom: '1rem' }}>
                            <Form.Label>작업자</Form.Label>
                            <Form.Select value={selectedWorker} onChange={handleWorkerSelectChange}>
                                <option value="">작업자를 선택하세요</option>
                                {workers.map((worker, index) => (
                                    <option key={index} value={worker}>{worker}</option>
                                ))}
                            </Form.Select>
                        </Form.Group> */}
                        <Form.Group style={{ marginBottom: '1rem' }}>
                            <Form.Label style={{ marginRight: '1rem' }}>시작 날짜</Form.Label>
                            <DatePicker
                                locale={ko}
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="yyyy.MM.dd"
                                className="form-control"
                                maxDate={endDate} // 최대 선택 가능한 날짜를 종료 날짜로 설정
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{ marginRight: '1rem' }}>종료 날짜</Form.Label>
                            <DatePicker
                                locale={ko}
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                dateFormat="yyyy.MM.dd"
                                className="form-control"
                                minDate={startDate} // 최소 선택 가능한 날짜를 시작 날짜로 설정
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            닫기
                        </Button>
                        <Button variant="primary" onClick={addSchedule}>
                            저장
                        </Button>
                    </Modal.Footer>
                </CustomModal>
                :
                <></>
            }
        </>
    );
};

export default ProjectPageLeftPanel;