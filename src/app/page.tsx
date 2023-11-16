'use client'

import AfterNameWinner from '@/components/AfterNameWinner';
import ResultNameWinner from '@/components/ResultNameWinner';
import Utils from '@/utils/utils';
import { Button, Checkbox, Container, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import styled from 'styled-components';
import { range, without } from 'lodash'
import SettingsIcon from "@mui/icons-material/Settings"
import { useState } from 'react';

const ButtonCustom = styled.p`
  &:hover {
    color: blue
  }
  cursor: pointer
`
const ClearResults = styled.h4`
  &:hover {
    color: blue
  }
  cursor: pointer
`

export default function Home() {
  let listName: any | undefined;
  const resultArr = (arr: any[]) => {
    const res = arr.filter(val => {
      if (val.includes('\n')) {
        const con = val.split('\n')
        Utils.uniqFast(con).forEach(val => {
          arrE.push(val)
        })
      }
      if (!val.includes('\n')) {
        return !val.includes('\n')
      }
    })
    return without(arrE.concat(res), '')
  }

  const splitBySpace = (arr: any[]) => {
    const arrEmber: any[] = []
    const res = arr.filter(val => {
      if (val.includes(' ')) {
        without(val.split(' '), '').forEach(val => {
          arrEmber.push(val)
        }) 
      }
      if (!val.includes(' ')) {
        return !val.includes(' ')
      }
    })
    return Utils.uniqFast(res.concat(arrEmber))
  }

  const arrE: any[] = []
  const [numWinner, setNumWinner] = useState<number|string>(1)
  const [customNumWinner, setCustomNumWinner] = useState<number>(1)
  const [listWinner, setListWinner] = useState<any[]>([])
  const [nameParticipants, setNameParticipants] = useState('')
  const [stateOptions, setStateOptions] = useState({
    remove_name: false,
    same_names: false,
    split_names: false,
    filter_duplicate: true,
    add_information: false
  })

  const {remove_name, same_names, split_names, filter_duplicate, add_information} = stateOptions

  const handleDropDown = (event: any) => {
    setNumWinner(event.target.value)
  }

  const handleCheckBox = (event: any) => {
    setStateOptions({ ...stateOptions, [event.target.name]: event.target.checked})
  }

  const handleListName = (event: any) => {
    setNameParticipants(event.target.value)
  }

  const handleCustomNumWinner = (event: any) => {
    const val = event.target.value
    if (Number(val) < 0) {
      return
    }
    setCustomNumWinner(val)
  }

  if (filter_duplicate) {
    if (nameParticipants.includes(',')) {
      const abc = nameParticipants.split(',')
      listName = Utils.uniqFast(resultArr(abc))
    } else {
      listName = Utils.uniqFast(without(nameParticipants.split('\n'), ''))
    }
  } else {
    if (nameParticipants.includes(',')) {
      const abc = nameParticipants.split(',')
      listName = resultArr(abc)
    } else {
      listName = without(nameParticipants.split('\n'), '')
    }
  }

  if (split_names) {
    listName = splitBySpace(listName)
  }

  const resultNameWinner = (numNameWinner: number | string) => {
    let arrEmpty: any[] = []
    const oldLength = listName.length
      for (;;) {
        const rand = Utils.getRandomInt(1, listName.length) - 1
        const result = listName[rand]
        if (arrEmpty.length === numNameWinner) {
          break
        } else if (typeof numNameWinner === 'number' && same_names && numNameWinner > 1) {
          // console.log('SAME NAMES WINNER')
          arrEmpty.push(result)
        } else {
          // console.log('NOT SAME NAME')
          arrEmpty.push(result)
          arrEmpty = Utils.uniqFast(arrEmpty)
        }
    }
    if (remove_name) {
      listName = without(listName, ...arrEmpty)
    }
    if ((split_names && remove_name) || !split_names) {
      setNameParticipants(listName.join('\n'))
    }
    setListWinner(val => val.concat({result: arrEmpty, length: oldLength, dateTime: Utils.dateTimeFormat()}))
  }

  const handleRandomName = () => {
    if (numWinner === 'Custom') {
      const val = Number(customNumWinner)
      if (listName.length === 0 || listName.length < val || val === 0) {
        return
      } else {
        resultNameWinner(val)
      }
    } else if (listName.length === 0 || listName.length < numWinner) {
      return
    } else {
      resultNameWinner(numWinner)
    }
  }

  return (
    <div>
      <Container component='div' maxWidth='lg' className='!mt-[75px]'>
        <Grid container>
          <Grid container item lg={12} md={12} sm={12} xs={12}>
            <TextField
              label='List Names'
              multiline
              rows={9}
              value={nameParticipants}
              className='mt-[20px] text-white'
              onChange={handleListName}
              placeholder='Name 1, Name 2, Name 3, ...'
              variant='outlined'
              InputLabelProps={{style: { color: 'white' }}}
              inputProps={{ style: { color: "white" } }}
              fullWidth
            />
            <div className='flex justify-end w-full'>
              <p style={{fontStyle: 'italic'}}>Separate each name by comma or newline</p>
            </div>
            <div>
              <p>Number of names: <span className='font-bold'>{listName.length}</span></p>
            </div>
            <div className='flex w-full mt-[20px]'>
              <ButtonCustom className='z-10' onClick={() => setNameParticipants('')}><span className='[font-style:italic] pr-[5px]'>Remove all names from list</span> <span className='text-[blue]'>X</span></ButtonCustom>
            </div>
            <div className='flex w-full mt-[-25px]'>
              {listWinner.length !== 0 &&
                <ClearResults onClick={() => setListWinner([])} className='inline justify-end font-normal italic mt-[40px] mb-[10px]'>Clear results <span className='text-[blue]'>X</span></ClearResults>
              }
            </div>

            {listWinner.length > 0 ?
              listWinner.map((val, index) => {
                return (
                  <div key={index}>
                    {index === 0 &&
                      <div className='p-[10px] rounded-[20px] bg-[#bdc3c7] dark:bg-[#7f8c8d] mb-[20px]'>
                        <ResultNameWinner listWinner={listWinner} index={index}/>
                        <div className='flex flex-row justify-between'>
                          <Typography display='inline' variant='h6' className='text-white mt-[10px]'>Total winners: {listWinner[listWinner.length-index-1].result.length}</Typography>
                          <Typography display='inline' variant='h6' className='text-white mt-[10px]'>{listWinner[listWinner.length-index-1].dateTime}</Typography>
                        </div>
                      </div>
                    }
                    </div>
                );
              })
              : <div/>
            }

            <div className='flex w-full text-[#e74c3c] items-center my-[20px]'>
              <SettingsIcon className='text-[#2d3436] dark:text-customWhite'/>
              <p className='pl-[10px] font-semibold text-[#2d3436] dark:text-customWhite'>Name Picker Options</p>
            </div>
            <FormControl variant='outlined' className='w-full'>
              <InputLabel className='text-customWhite'>Number of names/winners</InputLabel>
              <Select
                defaultValue={numWinner}
                label='Number of names/winners'
                value={numWinner}
                onChange={handleDropDown}
                className='!text-[white]'
              >
                {range(5).concat(Utils.dropdownList).map((val, index) => {
                  return (
                    <MenuItem value={val < 5 ? val+1: val} key={index}>{val < 5 ? val+1: val}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
            {numWinner === 'Custom' ?
              <TextField
                label='Custom Number'
                type='number'
                value={customNumWinner}
                style={{marginTop: '20px'}}
                onChange={handleCustomNumWinner}
                placeholder='Number'
                variant='outlined'
                fullWidth
              />
              : <div/>
            }
            <FormControl component='fieldset'>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={remove_name} onChange={handleCheckBox} name='remove_name'/>}
                  label='Remove name from list of names after drawing winner'/>
                <FormControlLabel
                  style={{cursor: typeof numWinner === 'number' && numWinner < 2 ? 'not-allowed' : 'pointer', color:  typeof numWinner === 'number' && numWinner < 2 ? '#ecf0f1' : ''}}
                  control={
                    typeof numWinner === 'number' && numWinner < 2 
                    ? <Checkbox checked={same_names} name='same_names' className='cursor-not-allowed text-[#ecf0f1]'/>
                    : <Checkbox checked={same_names} onChange={handleCheckBox} name='same_names'/>
                  }
                  label='Same name/winner possible in one draw (when using multiple winners)'/>
                <FormControlLabel
                  control={<Checkbox checked={split_names} onChange={handleCheckBox} name='split_names'/>}
                  label='Split names by space'/>
                <FormControlLabel
                  control={<Checkbox checked={filter_duplicate} onChange={handleCheckBox} name='filter_duplicate'/>}
                  label='Filter duplicate names'/>
              </FormGroup>
            </FormControl>
            </Grid>
            <Button            
             className="my-5 !text-white bg-[#d7d7d7] bg-[linear-gradient(147deg,#d7d7d7_0%,#353535_74%)] hover:bg-[#d3d3d3] hover:bg-[linear-gradient(315deg,#57606f_0%,#d3d3d3_95%)] focus:ring-4 focus:outline-none focus:ring-[#636e72] dark:focus:ring-[#b2bec3] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-5" fullWidth onClick={listName.length > 1 ? handleRandomName : undefined}>Pick random name(s)</Button>
        </Grid>
      </Container>
      <Container component='div' maxWidth='lg'>
        <div className='flex flex-grow items-center flex-row justify-between'>
          <Typography variant='h5'>Winners Name Picker</Typography>
          {listWinner.length !== 0 &&
            <ClearResults onClick={() => setListWinner([])} className='inline justify-end font-normal italic'>Clear results <span className='text-[blue]'>X</span></ClearResults>
          }
        </div>
        {listWinner.length === 0 && <Typography className='my-5 italic font-bold' display='block' variant='body1'>Empty</Typography>}
      </Container>
      {listWinner.length > 0 &&
        listWinner.map((val, index) => {
          return (
            <Container key={index}>
              {index !== 0 ?
                <div className='mb-[20px] p-[10px] [border-color:black] dark:[border-color:#b2bec3] [border-style:solid] rounded-[20px] [border-width:1px]'>
                  <AfterNameWinner listWinner={listWinner} index={index}/>
                  <div className='flex flex-row justify-between'>
                    <Typography display='inline' variant='body1'>Total winners: {listWinner[listWinner.length-index-1].result.length}</Typography>
                    <Typography display='inline' variant='body1'>{listWinner[listWinner.length-index-1].dateTime}</Typography>
                  </div>
                </div>
              : <div/>
              }
            </Container>
          )
        })
      }
    </div>
  )
}
