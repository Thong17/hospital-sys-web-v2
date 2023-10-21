import { Box, FormControlLabel } from '@mui/material'
import { useAppDispatch } from 'app/store'
import { useEffect, useState } from 'react'
import { getRolePermission, getRolePermissionShape } from 'stores/role/action'
import { Checkbox } from './Checkbox'
import { translate } from 'contexts/language/LanguageContext'
import {
  determineCheckAll,
  determineObjectValue,
  filterSelectedMenu,
  mergeObjects,
} from 'utils/index'

const INDENT_WIDTH = 30

const PrivilegeBox = ({
  defaultNavigation,
  defaultPrivilege,
  onChangeNavigation,
  onChangePrivilege,
}: {
  defaultNavigation: any
  defaultPrivilege: any
  onChangeNavigation: (_data: any) => void
  onChangePrivilege: (_data: any) => void
}) => {
  const dispatch = useAppDispatch()
  const [navigation, setNavigation] = useState({})
  const [privilege, setPrivilege] = useState({})
  const [checkedNavigation, setCheckedNavigation] = useState<any>({})
  const [checkedPrivilege, setCheckedPrivilege] = useState<any>({})

  useEffect(() => {
    setCheckedNavigation((prev: any) => mergeObjects(prev, defaultNavigation))
    return () => {
      setCheckedNavigation({})
    }
  }, [defaultNavigation])

  useEffect(() => {
    setCheckedPrivilege((prev: any) => mergeObjects(prev, defaultPrivilege))
    return () => {
      setCheckedPrivilege({})
    }
  }, [defaultPrivilege])

  useEffect(() => {
    const fetchPermissionShape = async () => {
      const response = await dispatch(getRolePermissionShape()).unwrap()
      if (response?.code !== 'SUCCESS') return
      const { preRole, preMenu } = response
      setCheckedNavigation((prev: any) => mergeObjects(preMenu, prev))
      setCheckedPrivilege((prev: any) => mergeObjects(preRole, prev))
    }
    fetchPermissionShape()
    return () => {
      setCheckedNavigation({})
      setCheckedPrivilege({})
    }
  }, [])

  useEffect(() => {
    const fetchPermission = async () => {
      const response = await dispatch(getRolePermission()).unwrap()
      if (response?.code !== 'SUCCESS') return
      const { navigation, privilege } = response
      setPrivilege(privilege)
      setNavigation(navigation)
    }
    fetchPermission()
    return () => {
      setPrivilege({})
      setNavigation({})
    }
  }, [])

  const handleChangeSubNav = (event: any, value: any) => {
    const [nav, sub] = event.target.name.split('.')
    if (!nav || !sub) return
    const newData = Object.assign({}, checkedNavigation)
    newData[nav][sub] = value
    onChangeNavigation(newData)
  }

  const handleChangePrivilege = (event: any, value: any) => {
    const [menu, nav, action] = event.target.name.split('.')
    if (!menu || !nav || !action) return
    const newData = Object.assign({}, checkedPrivilege)
    newData[menu][nav][action] = value
    onChangePrivilege(newData)
  }

  const handleChangeMenu = (event: any, value: any) => {
    const name = event.target.name
    const newData = Object.assign({}, checkedNavigation)
    if (!newData?.[name]) return
    Object.keys(newData[name]).forEach((key) => {
      newData[name][key] = value
    })
    onChangeNavigation(newData)
  }

  const handleChangeNavigation = (event: any, value: any) => {
    const [menu, nav] = event.target.name.split('.')
    const newData = Object.assign({}, checkedPrivilege)
    if (!newData?.[menu]?.[nav]) return
    Object.keys(newData[menu][nav]).forEach((key) => {
      newData[menu][nav][key] = value
    })
    onChangePrivilege(newData)
  }

  const handleChangeAllNavigation = (_event: any, value: any) => {
    const newData = Object.assign({}, checkedNavigation)
    Object.keys(newData).forEach((m) => {
      Object.keys(newData[m]).forEach((n) => {
        newData[m][n] = value
      })
    })
    onChangeNavigation(newData)
  }

  const handleChangeAllPrivilege = (_event: any, value: any) => {
    const newData = Object.assign({}, checkedPrivilege)
    Object.keys(newData).forEach((m) => {
      Object.keys(newData[m]).forEach((n) => {
        Object.keys(newData[m][n]).forEach((a) => {
          newData[m][n][a] = value
        })
      })
    })
    onChangePrivilege(newData)
  }

  return (
    <>
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              onChange={handleChangeAllNavigation}
              checked={determineCheckAll(checkedNavigation) === true}
              indeterminate={
                determineCheckAll(checkedNavigation) === 'indeterminate'
              }
            />
          }
          label={translate('CHECK_ALL')}
        />
        {Object.keys(navigation).map((nav, index) => {
          return (
            <Box key={index} sx={{ marginLeft: `${INDENT_WIDTH}px` }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name={nav}
                    onChange={handleChangeMenu}
                    checked={
                      determineObjectValue(
                        checkedNavigation?.[nav as keyof typeof navigation]
                      ) === true
                    }
                    indeterminate={
                      determineObjectValue(
                        checkedNavigation?.[nav as keyof typeof navigation]
                      ) === 'indeterminate'
                    }
                  />
                }
                label={translate(nav.toUpperCase())}
              />
              <Box
                sx={{
                  marginLeft: `${INDENT_WIDTH}px`,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                }}
              >
                {Object.keys(navigation[nav as keyof typeof navigation]).map(
                  (sub, key) => {
                    return (
                      <FormControlLabel
                        key={key}
                        control={
                          <Checkbox
                            name={`${nav}.${sub}`}
                            onChange={handleChangeSubNav}
                            checked={
                              checkedNavigation?.[
                                nav as keyof typeof navigation
                              ]?.[sub]
                            }
                          />
                        }
                        label={translate(sub.toUpperCase())}
                      />
                    )
                  }
                )}
              </Box>
            </Box>
          )
        })}
      </Box>
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              onChange={handleChangeAllPrivilege}
              checked={
                determineCheckAll(
                  filterSelectedMenu(checkedPrivilege, checkedNavigation)
                ) === true
              }
              indeterminate={
                determineCheckAll(
                  filterSelectedMenu(checkedPrivilege, checkedNavigation)
                ) === 'indeterminate'
              }
            />
          }
          label={translate('CHECK_ALL')}
        />
        <Box sx={{ marginLeft: `${INDENT_WIDTH}px` }}>
          {Object.keys(privilege).map((menu, index) => {
            return (
              <Box key={index}>
                {Object.keys(privilege[menu as keyof typeof privilege]).map(
                  (nav, key) => {
                    return (
                      <Box
                        key={key}
                        sx={{
                          display: !!checkedNavigation[menu]?.[nav]
                            ? 'block'
                            : 'none',
                        }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              name={`${menu}.${nav}`}
                              onChange={handleChangeNavigation}
                              checked={
                                determineObjectValue(
                                  checkedPrivilege?.[menu]?.[nav]
                                ) === true
                              }
                              indeterminate={
                                determineObjectValue(
                                  checkedPrivilege?.[menu]?.[nav]
                                ) === 'indeterminate'
                              }
                            />
                          }
                          label={translate(nav.toUpperCase())}
                        />
                        <Box
                          sx={{
                            marginLeft: `${INDENT_WIDTH}px`,
                            display: 'grid',
                            gridTemplateColumns:
                              'repeat(auto-fill, minmax(140px, 1fr))',
                          }}
                        >
                          {Object.keys(
                            privilege[menu as keyof typeof privilege]?.[nav]
                          ).map((action, key) => {
                            return (
                              <FormControlLabel
                                key={key}
                                control={
                                  <Checkbox
                                    name={`${menu}.${nav}.${action}`}
                                    onChange={handleChangePrivilege}
                                    checked={
                                      checkedPrivilege?.[menu]?.[
                                        nav as keyof typeof navigation
                                      ]?.[action]
                                    }
                                  />
                                }
                                label={translate(action.toUpperCase())}
                              />
                            )
                          })}
                        </Box>
                      </Box>
                    )
                  }
                )}
              </Box>
            )
          })}
        </Box>
      </Box>
    </>
  )
}

export default PrivilegeBox
