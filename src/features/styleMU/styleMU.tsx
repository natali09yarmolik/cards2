import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
  button: {
    width: 'max-content',
    height: '30px',
    padding: '6px 16px',
    fontSize: '0.875rem',
    fontWeight: 500,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    borderRadius: '20px',
    lineHeight: '1.75',
    background: '#3f51b5',
    letterSpacing: '0.02857em',
    textTransform: 'uppercase',
    color: '#fff',
  },
  buttonSave: {
    minWidth: '100px',
    height: '30px',
    fontSize: '0.875rem',
    fontWeight: 500,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    borderRadius: '20px',
    lineHeight: '1.75',
    background: '#3f51b5',
    letterSpacing: '0.02857em',
    textTransform: 'uppercase',
    color: '#fff',
  },
  textField: {
    width: '200px',
    height: '30px',
    marginRight: '10px',
    fontSize: '18px',
    marginBottom: '17px',
    color: '#282c34',
  },
  slider: {
    width: '150px',
  },
  inputForSearch: {
    display: 'inline-block',
    backgroundColor: '#d5bcbc',
  },
  select: {
    width: '80px',
    height: '40px',
  },
}))
