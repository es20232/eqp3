import HomeIcon from '@mui/icons-material/Home';
import PublishIcon from '@mui/icons-material/Publish';
import SaveIcon from '@mui/icons-material/Save';

export const mainMenuItems = [
    {
        id: 0,
        label: 'Início',
        icon: <HomeIcon fontSize='large'/>,
        route: '/home'
    },
    {
        id: 1,
        label: 'Postar',
        icon: <PublishIcon fontSize='large'/>,
        route: '/createPost'
    },
    {
        id: 2,
        label: 'Salvar Imagem',
        icon: <SaveIcon fontSize='large'/>,
        route: 'save'
    },
]