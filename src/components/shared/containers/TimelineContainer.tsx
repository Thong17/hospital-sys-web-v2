import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import TimelineDot from '@mui/lab/TimelineDot'
import Typography from '@mui/material/Typography'
import useTheme from 'hooks/useTheme'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import CreateRoundedIcon from '@mui/icons-material/CreateRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import DoneRoundedIcon from '@mui/icons-material/DoneRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ChangeHistoryRoundedIcon from '@mui/icons-material/ChangeHistoryRounded'

const list = [
  {
    timeline: '13 Oct 2023\n9:30 am',
    actionType: 'REJECT',
    title: 'Update',
    content: 'Description',
  },
  {
    timeline: '19:30 am',
    actionType: 'DELETE',
    title: 'Eat',
    content: 'Description',
  },
  {
    timeline: '9:30 am',
    actionType: 'APPROVE',
    title: 'Eat',
    content: 'Description',
  },
  {
    timeline: '9:30 am',
    actionType: 'UPDATE',
    title: 'Eat',
    content: 'Description',
  },
  {
    timeline: '9:30 am',
    actionType: 'CREATE',
    title: 'Eat',
    content: 'Description',
  },
]

const Item = ({
  timeline,
  type,
  title,
  content,
}: {
  timeline: String
  type: string
  title: String
  content: String
}) => {
  const { theme } = useTheme()
  const renderType = (type: string) => {
    switch (true) {
      case type === 'CREATE':
        return <AddRoundedIcon />
      case type === 'UPDATE':
        return <CreateRoundedIcon />
      case type === 'DELETE':
        return <DeleteRoundedIcon />
      case type === 'APPROVE':
        return <DoneRoundedIcon />
      case type === 'REJECT':
        return <CloseRoundedIcon />

      default:
        return <ChangeHistoryRoundedIcon />
    }
  }
  return (
    <TimelineItem>
      <TimelineOppositeContent
        sx={{ m: 'auto 0', color: theme.text.quaternary, width: '80px' }}
        align='right'
        variant='body2'
      >
        {timeline}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector />
        <TimelineDot>{renderType(type)}</TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent sx={{ py: '12px', px: 2 }}>
        <Typography variant='h6' component='span'>
          {title}
        </Typography>
        <Typography>{content}</Typography>
      </TimelineContent>
    </TimelineItem>
  )
}

const TimelineContainer = () => {
  return (
    <Timeline
      sx={{
        alignItems: 'flex-start',
        '& .MuiTimelineConnector-root': { flex: 1 },
      }}
    >
      {list.map((item, key) => (
        <Item
          key={key}
          title={item.title}
          content={item.content}
          timeline={item.timeline}
          type={item.actionType}
        />
      ))}
    </Timeline>
  )
}

export default TimelineContainer
