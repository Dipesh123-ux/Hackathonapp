import React, { useState, useEffect } from 'react'
import Hack from './Hack'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { RotatingLines } from 'react-loader-spinner'


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'upcoming',
    'active',
    'past',
    'easy',
    'medium',
    'hard'
];


const List = () => {
    const [hackathons, setHack] = useState([]);
    const [query, setQuery] = useState("")
    const [Final, setFinal] = useState([]);
    const [selected, setSelected] = React.useState([]);

    const handleChange2 = (event) => {
        const {
            target: { value },
        } = event;
        setSelected(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleChange = (e) => {
        setQuery(e.target.value);
    }

    console.log(selected);
    useEffect(() => {
        fetch('https://hackathondphi.herokuapp.com/api/hackathons', {
            method: 'GET',
        }).then((data) => {
            return data.json();
        })
            .then(data => {
                console.log(data.hackathons)
                setHack(data.hackathons)
            })
            .catch(err => {
                console.log(err)
            })

        let updatedHack = hackathons;

        if (query) {
            updatedHack = updatedHack.filter((item) => {
                return item.title.toLowerCase().includes(query)
            }
            )
        }

        if (selected.length > 0 && updatedHack.length > 0) {
            selected.forEach((item) => {
                if (item === "easy") {
                    updatedHack = updatedHack.filter((h) => {
                        return h.level.toLowerCase() === "easy";
                    })
                }
                if (item === "medium") {
                    updatedHack = updatedHack.filter((h) => {
                        return h.level.toLowerCase() === "medium";
                    })
                }
                if (item === "hard") {
                    updatedHack = updatedHack.filter((h) => {
                        return h.level.toLowerCase() === "hard";
                    })
                }
                if (item === "upcoming") {
                    let c = new Date().getTime();
                    updatedHack = updatedHack.filter((h) => {
                        return parseInt(h.start) > c;
                    })
                }
                if (item === "active") {
                    let c = new Date().getTime();
                    updatedHack = updatedHack.filter((h) => {
                        return ((parseInt(h.start) < c) && (parseInt(h.end) > c));
                    })
                }
                if (item === "past") {
                    let c = new Date().getTime();
                    updatedHack = updatedHack.filter((h) => {
                        return ((parseInt(h.start) < c) && (parseInt(h.end) < c));
                    })
                }
            })
        }

        setFinal(updatedHack);



    }, [hackathons, query, selected])


    const showList = () => {


        if (Final.length == 0) {

            return <div className="bg-primary h-48 flex justify-center">
                <RotatingLines

                    strokeColor="grey"
                    strokeWidth="3"
                    animationDuration="0.75"
                    width="80"
                    visible={true}
                />
            </div>
        }

        else {

            return <div className="ml-40 mr-40 grid md:grid-cols-3 gap-10">
                {Final.map((item) => (
                    <Hack hack={item} />
                ))
                }
            </div>
        }

    }

   return (
            <div className="">
                <div className="flex justify-center flex-col h-40 bg-secondary">
                    <div className="mt-4 text-white text-xl font-bold ml-auto mr-auto mb-4">Explore Challenges</div>
                    <div className="flex">
                        <div class="w-full text-center mb-3 md:mb-0">
                            <input class="appearance-none m-auto block w-2/4 bg-gray-200 text-gray-700 border rounded py-1 px-3 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Search" onChange={handleChange} />
                        </div>
                        <div className="mr-40 mb-8" >
                            <FormControl style={{ border: "1px solid white" }} sx={{ m: 1, width: 200 }}>
                                <InputLabel style={{ color: "white" }} id="demo-multiple-checkbox-label">Filter</InputLabel>
                                <Select
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    multiple
                                    value={selected}
                                    onChange={handleChange2}
                                    input={<OutlinedInput label="Tag" />}
                                    renderValue={(se) => se.join(', ')}
                                    MenuProps={MenuProps}
                                >
                                    {names.map((name) => (
                                        <MenuItem key={name} value={name}>
                                            <Checkbox checked={selected.indexOf(name) > -1} />
                                            <ListItemText primary={name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </div>
                <div className="h-max bg-primary">

                    {showList()}

                </div>
            </div>
        )
    }


    export default List