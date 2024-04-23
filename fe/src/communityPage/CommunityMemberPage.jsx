import styled from 'styled-components'

import SearchButtonIcon from '/image/community/search.png'
import { useState } from 'react'

import DropDawnIcon from '/image/nav/dropdownIcon.png'
import ProceedSelection from './ProceedSelection'
import TeamSelection from './TeamSelection'


const MemberPage = styled.div`
    display: flex;        
    flex-direction: column;
    width: 50%;
    margin-right : 20rem;
    margin-top : 4rem;
`

const Search = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    width: 100%;

    border: 2px solid transparent;
    border-image: linear-gradient(to right, #3DC7AF, #613ACD);
    border-image-slice: 1;
    border-radius: 10px;

`

const SearchInput = styled.input`
    padding: 0.5rem 0.5rem;
    width: 90%;
    border: none;
    outline: none;
    
    &::placeholder { 
        color: rgba(189, 189, 189, 1); // 플레이스홀더 텍스트의 색상
    }
`

const SearchButton = styled.img`
    height: 1.2rem;
`

const Select = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    margin: 1rem 0;
`

const Option = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
`

const Proceed = styled.div`
    display: flex;
    align-items: start;
    justify-content: center;
`

const ProceedToggle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: rgba(62, 200, 175, 1);
    padding: 0.2rem 1rem;

    width: 8rem;

    color: white;

    border: 2px solid rgba(62, 200, 175, 1);
    border-radius: 50px;
`

const Team = styled.div`
    display: flex;
    align-items: start;
    justify-content: center;
`

const TeamToggle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: rgba(58, 166, 184, 1);
    padding: 0.2rem 1rem;

    width: 8rem;

    color: white;

    border: 2px solid rgba(58, 166, 184, 1);
    border-radius: 50px;
`

const Posts = styled.div`
`

const CommunityMemberPage = () => {
    const [searchWord, setSearchWord] = useState("");
    const [proceedOption, setProceedOption] = useState("모두");
    const [teamOption, setTeamOption] = useState("팀 선택");
    const [proceedToggle, setProceedToggle] = useState(false);
    const [teamToggle, setTeamToggle] = useState(false);
    
    //검색하기 axios
    const search = () => {

    }
    //searchWord 상태값 변경
    const handleInputChange = (event) => {
        setSearchWord(event.target.value);  // 입력된 값으로 상태 업데이트
      };
    return(
        <MemberPage>
            <Search>
                <SearchInput
                    placeholder="팀 프로젝트를 검색해보세요"
                    value={searchWord}
                    onChange={handleInputChange}
                >
                </SearchInput>
                <SearchButton
                    src={SearchButtonIcon}
                    onClick={()=> search()}
                >
                </SearchButton>

            </Search>
            <Select>
                <Option>
                <Proceed>
                    <ProceedToggle onClick={() => setProceedToggle(!proceedToggle)}>
                    {proceedOption}
                    {proceedToggle ? 
                    <img
                        src={DropDawnIcon}
                        style={{ transform: 'rotate(180deg)', height: "50%"}}
                    >
                    </img> : 
                    <img
                        src={DropDawnIcon}
                        style={{height:"50%"}}
                    >
                    </img>
                    }
                    </ProceedToggle>
                    {proceedToggle && 
                    <ProceedSelection
                        proceedOption={proceedOption}
                        setProceedOption={setProceedOption}
                    ></ProceedSelection>}
                </Proceed>



                <Team>
                    <TeamToggle onClick={() => setTeamToggle(!teamToggle)}>
                    {teamOption}
                    {teamToggle ? 
                    <img
                        src={DropDawnIcon}
                        style={{ transform: 'rotate(180deg)', height: "50%" }}
                    >
                    </img> : 
                    <img
                        src={DropDawnIcon}
                        style={{height:"50%"}}
                    >
                    </img>
                    }
                    </TeamToggle>
                    {teamToggle && 
                    <TeamSelection
                        teamOption={teamOption}
                        setTeamOption={setTeamOption}
                    ></TeamSelection>}
                </Team>
                </Option>
                <div>
                    글쓰기
                </div>

            </Select>
            <Posts>
                posts
            </Posts>
        </MemberPage>
    )
}

export default CommunityMemberPage;