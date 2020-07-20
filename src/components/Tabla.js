import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { useQuery, gql } from '@apollo/client';
import ModalCharacterInfo from './ModalCharacterInfo';

const CHARACTERS = gql`
query getCharacters {
    characters{
        name
        height
        mass
        hair_color
        skin_color
        eye_color
        birth_year
        gender
        homeworld
        films
        created
        edited
        url
    }
  }
`;

export default function MaterialTableDemo() {
  const [openModal, setOpenModal] = useState(false);
  const [currentCharacter, setCurrentCharacter] = useState();
  const [characterFilms, setCharacterFilms] = useState([]);
  const { loading, error, data } = useQuery(CHARACTERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const columns = [
    { title: 'Name', field: 'name' },
    { title: 'Gender', field: 'gender' },
    { title: 'Birth Year', field: 'birth_year' }
  ];

  const handleOpenModal = (rowData) => {
    let films = [];
    rowData.films.map(row => {
      let url_segments = row.split("/")
      films.push(url_segments[url_segments.length - 2])
      return false;
    })
    setCharacterFilms(films);
    setCurrentCharacter(rowData);
    setOpenModal(true);
    return false;
  }

  const datos = data.characters.map(o => ({ ...o }));

  return (
    <div>
      <MaterialTable
        title="Star Wars Characters"
        columns={columns}
        data={datos}
        options={{
          pageSize: 10
        }}
        onRowClick={(event, rowData) => {
          handleOpenModal(rowData);
        }}
      />
      {openModal && <ModalCharacterInfo
        open={openModal}
        setOpen={setOpenModal}
        character={currentCharacter}
        setCurrentCharacter={setCurrentCharacter}
        characterFilms={characterFilms}
        setCharacterFilms={setCharacterFilms}
      />}
    </div>
  );
}