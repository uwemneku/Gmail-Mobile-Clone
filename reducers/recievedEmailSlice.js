import {createSlice} from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'recievedEmail',
    initialState:{
        value:[
            {   
                id:'1',
                time:'05:08',
                sender:'Uwem Israel',
                unread: true,
                details: 'lorem',
                selected: false,
                starred:true,
                subject: 'This is a mock email',
                preview: 'This app was created with react native',
                archived: false,
            },
            {   
                id:'2',
                time:'05:08',
                sender:'Uwem Israel',
                unread: true,
                details: 'lorem',
                selected: false,
                starred:false,
                subject: 'This is a mock email',
                preview: 'This app was created with react native',
                archived: false,
            },
            {   
                id:'3',
                time:'05:08',
                sender:'Uwem Israel',
                unread: true,
                details: 'lorem',
                selected: false,
                starred:false,
                subject: 'This is a mock email',
                preview: 'This app was created with react native',
                archived: false,
            },
            {   
                id:'4',
                time:'05:08',
                sender:'Uwem Israel',
                unread: true,
                details: 'lorem',
                selected: false,
                starred:false,
                subject: 'This is a mock email',
                preview: 'This app was created with react native',
                archived: false,
            },
            {   
                id:'5',
                time:'05:08',
                sender:'Uwem Israel',
                unread: true,
                details: 'lorem',
                selected: false,
                starred:false,
                subject: 'This is a mock email',
                preview: 'This app was created with react native',
                archived: false,
            },
            {   
                id:'6',
                time:'05:08',
                sender:'Uwem Israel',
                unread: true,
                details: 'lorem',
                selected: false,
                starred:false,
                subject: 'This is a mock email',
                preview: 'This app was created with react native',
                archived: false,
            },
            {   
                id:'7',
                time:'05:08',
                sender:'Uwem Israel',
                unread: true,
                details: 'lorem',
                selected: false,
                starred:false,
                subject: 'This is a mock email',
                preview: 'This app was created with react native',
                archived: false,
            },
            {   
                id:'8',
                time:'05:08',
                sender:'Uwem Israel',
                unread: true,
                details: 'lorem',
                selected: false,
                starred:false,
                subject: 'This is a mock email',
                preview: 'This app was created with react native',
                archived: false,
            },
            {   
                id:'9',
                time:'05:08',
                sender:'Uwem Israel',
                unread: true,
                details: 'lorem',
                selected: false,
                starred:false,
                subject: 'This is a mock email',
                preview: 'This app was created with react native',
                archived: false,
            },
        ]
    },
    reducers: {
        addEmail: (state, action) => {
            const newMail = action.payload
            state.value.push(newMail)
        },
        deleteMail: (state, action) => {
            const mailId = action.payload
            const oldState = state.value
            const newState = oldState.filter(email => email.id !== mailId)
            state.value = newState;
        },
        searchMail: (state, action) => {
            const mailId = action.payload
            const oldState = state.value
            const newState = oldState.filter(email => email.id !== mailId)
            state.value = newState;
        },
        selectMail: (state, action) => {
            const mailId = action.payload
            const index = state.value.findIndex(mail => mail.id == mailId)
            const mail = state.value[index]
            state.value.splice(index, 1, {...mail, selected:true})
        },
        deselectMail: (state, action) => {
            const mailId = action.payload
            const index = state.value.findIndex(mail => mail.id == mailId)
            const mail = state.value[index]
            state.value.splice(index, 1, {...mail, selected:false})
        },
        starMail: (state, action) => {
            const mailId = action.payload
            const index = state.value.findIndex(mail => mail.id == mailId)
            const mail = state.value[index]
            console.log(mail);
            state.value.splice(index, 1, {...mail, starred:true})
            
        },
        unStarMail: (state, action) => {
            const mailId = action.payload
            const index = state.value.findIndex(mail => mail.id == mailId)
            const mail = state.value[index]
            state.value.splice(index, 1, {...mail, starred:false})
        },
        archiveMail: (state, action) => {
            const mailId = action.payload
            const index = state.value.findIndex(mail => mail.id == mailId)
            const mail = state.value[index]
            state.value.splice(index, 1, {...mail, archived:true})
        },
        unArchiveMail: (state, action) => {
            const mailId = action.payload
            const index = state.value.findIndex(mail => mail.id == mailId)
            const mail = state.value[index]
            state.value.splice(index, 1, {...mail, archived:false})
        },
    }
})

export const {
        addEmail, deleteMail, 
        deselectMail, selectMail, 
        unStarMail, starMail,
        archiveMail, unArchiveMail
    } = slice.actions
export default slice.reducer