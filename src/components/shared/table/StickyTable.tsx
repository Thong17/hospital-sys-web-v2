import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import useTheme from 'hooks/useTheme'
import Loading from '../Loading'
import { CustomPagination, CustomTableContainer } from 'styles'
import ToggleOnIcon from '@mui/icons-material/ToggleOn'
import ToggleOffIcon from '@mui/icons-material/ToggleOff'
import { IconButton, Pagination, TableSortLabel } from '@mui/material'
import useLanguage from 'hooks/useLanguage'
import useDevice from 'hooks/useDevice'
import { languages } from 'contexts/language/constant'
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded'
import { translate } from 'contexts/language/LanguageContext'
import SelectInput from '../forms/SelectInput'

export interface ITableColumn<Column> {
  id: Column
  label: any
  minWidth?: number
  maxWidth?: number
  align?: 'left' | 'right' | 'center'
  format?: (value: any) => any
  sort?: 'asc' | 'desc'
}

interface ITable {
  backgroundColor?: string
  pagination?: Boolean
  columns: ITableColumn<string>[]
  rows: any[]
  hasNumOrder?: boolean
  count?: number
  skip?: number
  limit?: number
  loading?: boolean
  onClick?: (_id: any) => void
  onToggleStatus?: (_id: any) => void
  onChangeLimit?: (_limit: any) => void
  onChangePage?: (_page: any) => void
  onSort?: (_column: any) => void
  style?: React.CSSProperties
}

export const StickyTable = ({
  backgroundColor = 'primary',
  pagination = true,
  columns,
  rows,
  hasNumOrder = true,
  count = 0,
  skip = 0,
  limit = 5,
  loading,
  onClick,
  onToggleStatus,
  onChangeLimit,
  onChangePage,
  onSort,
  style,
}: ITable) => {
  const { theme } = useTheme()
  const { device } = useDevice()
  const { language } = useLanguage()

  return (
    <CustomTableContainer color={backgroundColor} device={device} style={style}>
      {loading && <Loading />}
      <div className='table-container'>
        <TableContainer className='table'>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {hasNumOrder && <TableCell>{translate('NO')}</TableCell>}
                {columns.map((column) => (
                  <TableCell
                    style={{
                      minWidth: column.minWidth,
                      maxWidth: column.maxWidth,
                    }}
                    key={column.id}
                    align={column.align}
                  >
                    {!!column.sort ? (
                      <TableSortLabel
                        IconComponent={FilterListRoundedIcon}
                        active={!!column.sort}
                        direction={column.sort}
                        onClick={() => onSort && onSort(column)}
                      >
                        {language[
                          column.label as keyof typeof languages.English
                        ] || column.label}
                      </TableSortLabel>
                    ) : (
                      language[
                        column.label as keyof typeof languages.English
                      ] || column.label
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {rows?.length > 0 &&
              (!loading && pagination ? (
                <TableBody>
                  {rows.slice(0, skip * limit + limit).map((row, index) => {
                    return (
                      <TableRow
                        onClick={() => {
                          onClick && onClick(row)
                        }}
                        hover
                        role='checkbox'
                        tabIndex={-1}
                        key={row.id || index}
                        style={{
                          cursor: onClick ? 'pointer' : 'default',
                        }}
                      >
                        {hasNumOrder && (
                          <TableCell>{skip * limit + index + 1}</TableCell>
                        )}
                        {columns.map((column) => {
                          let value = row[column.id]
                          if (typeof value === 'boolean') {
                            value = value ? (
                              <IconButton
                                onClick={() =>
                                  onToggleStatus && onToggleStatus(row.id)
                                }
                                size='small'
                                style={{
                                  color: theme.color.success,
                                  backgroundColor: `${theme.color.success}22`,
                                }}
                              >
                                <ToggleOnIcon fontSize='small' />
                              </IconButton>
                            ) : (
                              <IconButton
                                onClick={() =>
                                  onToggleStatus && onToggleStatus(row.id)
                                }
                                size='small'
                                style={{
                                  color: theme.color.error,
                                  backgroundColor: `${theme.color.error}22`,
                                }}
                              >
                                <ToggleOffIcon fontSize='small' />
                              </IconButton>
                            )
                          }

                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{
                                minWidth: column.minWidth,
                                maxWidth: column.maxWidth,
                              }}
                            >
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value || '...'}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    )
                  })}
                </TableBody>
              ) : (
                !loading && (
                  <TableBody>
                    {rows.map((row, index) => {
                      return (
                        <TableRow
                          onClick={() => {
                            onClick && onClick(row)
                          }}
                          hover
                          role='checkbox'
                          tabIndex={-1}
                          key={row.id || index}
                          style={{
                            cursor: onClick ? 'pointer' : 'default',
                          }}
                        >
                          {hasNumOrder && <TableCell>{index + 1}</TableCell>}
                          {columns.map((column) => {
                            let value = row[column.id]
                            if (typeof value === 'boolean') {
                              value = value ? (
                                <IconButton
                                  onClick={() =>
                                    onToggleStatus && onToggleStatus(row.id)
                                  }
                                  size='small'
                                  style={{ color: theme.color.success }}
                                >
                                  <ToggleOnIcon style={{ fontSize: 30 }} />
                                </IconButton>
                              ) : (
                                <IconButton
                                  onClick={() =>
                                    onToggleStatus && onToggleStatus(row.id)
                                  }
                                  size='small'
                                  style={{ color: theme.color.error }}
                                >
                                  <ToggleOffIcon style={{ fontSize: 30 }} />
                                </IconButton>
                              )
                            }

                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{
                                  minWidth: column.minWidth,
                                  maxWidth: column.maxWidth,
                                }}
                              >
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            )
                          })}
                        </TableRow>
                      )
                    })}
                  </TableBody>
                )
              ))}
          </Table>
        </TableContainer>
      </div>
      {!loading && pagination && (
        <CustomPagination device={device}>
          <SelectInput
            height={'33px'}
            width={'70px'}
            value={limit}
            onChange={(event) =>
              onChangeLimit && onChangeLimit(event.target.value)
            }
            sx={{ marginRight: '10px', width: '70px' }}
            options={[
              { value: 5, label: '5' },
              { value: 10, label: '10' },
              { value: 20, label: '20' },
              { value: 50, label: '50' },
            ]}
          />
          <Pagination
            count={Math.ceil(count / limit)}
            page={skip + 1}
            size='medium'
            onChange={(_event, page) => onChangePage && onChangePage(page)}
          />
        </CustomPagination>
      )}
    </CustomTableContainer>
  )
}
