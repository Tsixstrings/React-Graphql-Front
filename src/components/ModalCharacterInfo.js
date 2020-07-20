import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, CircularProgress } from '@material-ui/core';
import { useQuery, gql } from '@apollo/client';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FILMS = gql`
query getFilms($ids: [String]) {
    film(ids: $ids){
        title
    }
  }
`;

export default function AlertDialogSlide(props) {

  const { loading, error, data } = useQuery(FILMS, {
    variables: { ids: props.characterFilms },
  });

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Character Info"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {loading &&
              <div>
                <CircularProgress />LOADING....
            </div>
            }
            {error &&
              <div>Error fetching data. Try again later.</div>
            }
            {data &&
              <div>
                <p>Name: {props.character.name}</p>
                <p>Height: {props.character.height}</p>
                <p>Mass: {props.character.mass}</p>
                <p>Hair Color: {props.character.hair_color}</p>
                <p>Skin Color: {props.character.skin_color}</p>
                <p>Eye Color: {props.character.eye_color}</p>
                <p>Birth Year: {props.character.birth_year}</p>
                <p>Gender: {props.character.gender}</p>
                <p>Homeworld: {props.character.homeworld}</p>
                <p>Created: {props.character.created}</p>
                <p>Edited: {props.character.edited}</p>
                <p>Url: {props.character.url}</p>
                <p>Films:</p>
                <p>
                  <ul>
                    {data.film.map(row => {
                      return <li>{row.title}</li>
                    })}
                  </ul>
                </p>
              </div>
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}