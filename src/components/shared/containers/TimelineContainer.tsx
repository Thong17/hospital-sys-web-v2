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
import { Tooltip } from '@mui/material'

export interface ITimelineItem {
  timeline: String
  actionType: String
  title: String
  content: String
}

const Item = ({
  timeline,
  type,
  title,
  content,
}: {
  timeline: String
  type: String
  title: String
  content: String
}) => {
  const { theme } = useTheme()
  const renderType = (type: String) => {
    switch (true) {
      case type === 'CREATE':
        return (
          <TimelineDot color='success'>
            <AddRoundedIcon color='success' />
          </TimelineDot>
        )
      case type === 'UPDATE':
        return (
          <TimelineDot color='info'>
            <CreateRoundedIcon />
          </TimelineDot>
        )
      case type === 'DELETE':
        return (
          <TimelineDot color='error'>
            <DeleteRoundedIcon />
          </TimelineDot>
        )
      case type === 'APPROVE':
        return (
          <TimelineDot color='info'>
            <DoneRoundedIcon />
          </TimelineDot>
        )
      case type === 'REJECT':
        return (
          <TimelineDot color='error'>
            <CloseRoundedIcon />
          </TimelineDot>
        )

      default:
        return <ChangeHistoryRoundedIcon />
    }
  }
  return (
    <TimelineItem sx={{ width: '100%' }}>
      <TimelineOppositeContent
        sx={{ m: 'auto 0', color: theme.text.quaternary, maxWidth: '80px' }}
        align='right'
        variant='body2'
      >
        {timeline}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector />
        {renderType(type)}
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent sx={{ py: '12px', px: 2, width: '80%' }}>
        <Typography variant='h6' component='span'>
          {title}
        </Typography>
        <Tooltip title={content}>
          <Typography noWrap textOverflow={'ellipsis'} overflow={'hidden'}>
            {content}
          </Typography>
        </Tooltip>
      </TimelineContent>
    </TimelineItem>
  )
}

const TimelineContainer = ({ data }: { data: ITimelineItem[] }) => {
  return (
    <Timeline
      sx={{
        alignItems: 'flex-start',
        '& .MuiTimelineConnector-root': { flex: 1 },
      }}
    >
      {data?.map((item, key) => (
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
