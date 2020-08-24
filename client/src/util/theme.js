import makeStyles from '@material-ui/core/styles/makeStyles';
const useStyles = makeStyles({
  palette: {
    primary: {
      light: '#357a38',
      main: '#4caf50',
      dark: '#6fbf73',
      contrastText: '#fff',
    },
    secondary: {
      light: '#1c54b2',
      main: '#2979ff',
      dark: '#5393ff',
      contrastText: '#000',
    },
  },
  card: {
    margin:"auto",
    position: 'relative',
    maxWidth:400,
    marginBottom: 20
  },
  imagePost: {
    height: 400,
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  },
    typography: {
      useNextVariants: true
    },
  form: {
    textAlign: 'center'
  },
  image: {
    margin: '10px auto 10px auto'
  },
  image2: {
    margin: '10px auto 10px auto',
    borderRadius:"50%"
  },
  pageTitle: {
    margin: '10px auto 10px auto'
  },
  textField: {
    margin: '10px auto 10px auto'
  },
  button: {
    marginTop: 20,
    position: 'relative'
  },
  button2: {
    float:"right"
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10
  },
  progress: {
    position: 'absolute',
    },
    invisibleSeparator: {
      border: 'none',
      margin: 4
    },
    visibleSeparator: {
      width: '100%',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      marginBottom: 20
    },
    paper: {
      padding: 20
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%'
        }
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle'
        },
        '& a': {
          color: '#00bcd4'
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer' 
        }
      }
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px'
      }
  },
  deleteButton: {
    position: 'absolute',
    left: '80%',
    bottom: 'auto',
  },
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%'
  },
  commentData: {
    marginLeft: 20,
  },
  card2: {
    display: 'flex',
    marginBottom: 20
  },
  cardContent: {
    width: '100%',
    flexDirection: 'column',
    padding: 25
  },
  cover: {
    minWidth: 200,
    objectFit: 'cover'
  },
  handle: {
    width: 60,
    height: 18,
    backgroundColor: 'rgba(0,0,0, 0.3)',
    marginBottom: 7
  },
  date: {
    height: 14,
    width: 100,
    backgroundColor: 'rgba(0,0,0, 0.3)',
    marginBottom: 10
  },
  fullLine: {
    height: 15,
    width: '90%',
    backgroundColor: 'rgba(0,0,0, 0.6)',
    marginBottom: 10
  },
  halfLine: {
    height: 15,
    width: '50%',
    backgroundColor: 'rgba(0,0,0, 0.6)',
    marginBottom: 10
  },
  handle2: {
    height: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: 60,
    margin: '0 auto 7px auto'
  },
  fullLine2: {
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '100%',
    marginBottom: 10
  },
  halfLine2: {
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '50%',
    marginBottom: 10
  },
  progressSpinner2: {
    position: 'absolute',
    bottom: "25%",
    left:"40%"
  },
});

export default useStyles