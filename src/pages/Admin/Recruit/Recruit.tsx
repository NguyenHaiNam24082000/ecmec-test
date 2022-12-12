import { deleteRecruitDetail, postRecruitDetail, putRecruitDetail } from '@apis/recruitApi';
import {
  Button,
  Divider,
  Group,
  Modal,
  NumberInput,
  Paper,
  Table,
  Tabs,
  Text,
  TextInput,
  TypographyStylesProvider,
  Input,
  Switch,
  Anchor,
  ActionIcon,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import RichTextEditor from '@mantine/rte';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { getRecruitApi } from 'redux/reducer/recruit.slice';
import { showNotification } from '@mantine/notifications';
import { openConfirmModal } from '@mantine/modals';

const labels = {
  roleVn: 'Tiêu đề',
  roleEn: 'Title',
  addressVn: 'Địa chỉ',
  addressEn: 'Address',
  contentVn: 'Mô tả',
  contentEn: 'Description',
  salary: 'Lương',
};

function Recruit() {
  const dispatch = useAppDispatch();
  const listRecruit = useAppSelector((state) => state.recruit.recruit);
  const [openedModalAddInfo, setOpenedModalAddInfo] = useState(false);
  const [openedModalInfo, setOpenedModalInfo] = useState({
    index: 0,
    isOpen: false,
  });
  const [openedModalEditInfo, setOpenedModalEditInfo] = useState(false);
  const form = useForm({
    initialValues: {
      roleVn: '',
      roleEn: '',
      addressVn: '',
      addressEn: '',
      contentVn: '',
      contentEn: '',
      salary: '',
      isShow: true,
      priority: listRecruit?.length || 0,
      createdTime: Date.now(),
      createdUser: 'admin',
      modifiedTime: Date.now(),
      modifiedUser: 'admin',
    },

    validate: {
      roleVn: (value) => (value.length ? null : `${labels.roleVn} bắt buộc phải nhập`),
      roleEn: (value) => (value.length ? null : `${labels.roleEn} bắt buộc phải nhập`),
      addressVn: (value) => (value.length ? null : `${labels.addressVn} bắt buộc phải nhập`),
      addressEn: (value) => (value.length ? null : `${labels.addressEn} bắt buộc phải nhập`),
      contentVn: (value) => (value.length ? null : `${labels.contentVn} bắt buộc phải nhập`),
      contentEn: (value) => (value.length ? null : `${labels.contentEn} bắt buộc phải nhập`),
    },
  });
  const isVietTabEmpty =
    form?.values?.roleVn?.length &&
    form?.values?.addressVn?.length &&
    form?.values?.contentVn?.length;
  const isEnglishTabEmpty =
    form?.values?.roleEn?.length &&
    form?.values?.addressEn?.length &&
    form?.values?.contentEn?.length;
  const getRecruit = () => {
    dispatch(getRecruitApi());
  };
  useEffect(() => {
    getRecruit();
  }, []);

  useEffect(() => {
    form.setValues({ priority: listRecruit.length });
  }, [listRecruit]);
  return (
    <Paper shadow="xs" p="md">
      <Button
        onClick={() => {
          setOpenedModalAddInfo(true);
        }}
      >
        Tạo mới
      </Button>
      <Table highlightOnHover withColumnBorders>
        <thead>
          <tr>
            <th style={{ width: 40 }}>Hiển thị</th>
            <th>{labels.roleVn}</th>
            <th>{labels.addressVn}</th>
            <th>{labels.salary}</th>
            <th style={{ width: 120 }}>Độ ưu tiên</th>
            <th style={{ width: 320 }}>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {!!listRecruit?.length &&
            listRecruit.map((recruit, index, arr) => (
              <tr key={recruit.id}>
                <td>
                  <Switch
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    checked={recruit.isShow}
                    onClick={(event: any) => {
                      putRecruitDetail({ ...recruit, isShow: event.target.checked }).then(() => {
                        getRecruit();
                      });
                    }}
                  />
                </td>
                <td>
                  <Anchor
                    onClick={() => {
                      setOpenedModalInfo({
                        index,
                        isOpen: true,
                      });
                    }}
                  >
                    {recruit.roleVn}
                  </Anchor>
                </td>
                <td>{recruit.addressVn}</td>
                <td>{recruit.salary}</td>
                <td>
                  <Group>
                    <ActionIcon
                      onClick={() => {
                        putRecruitDetail({
                          ...recruit,
                          priority: index > 1 ? arr.at(index - 1)!.priority! - 1 : 0,
                        }).then(() => {
                          getRecruit();
                        });
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-arrow-up"
                        width={44}
                        height={44}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#2c3e50"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1={12} y1={5} x2={12} y2={19} />
                        <line x1={18} y1={11} x2={12} y2={5} />
                        <line x1={6} y1={11} x2={12} y2={5} />
                      </svg>
                    </ActionIcon>
                    <ActionIcon
                      onClick={() => {
                        putRecruitDetail({
                          ...recruit,
                          priority:
                            index < arr.length ? arr.at(index + 1)!.priority! + 1 : arr.length,
                        }).then(() => {
                          getRecruit();
                        });
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-arrow-down"
                        width={44}
                        height={44}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#2c3e50"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1={12} y1={5} x2={12} y2={19} />
                        <line x1={18} y1={13} x2={12} y2={19} />
                        <line x1={6} y1={13} x2={12} y2={19} />
                      </svg>
                    </ActionIcon>
                  </Group>
                </td>
                <td>
                  <Group grow>
                    <Button
                      onClick={() => {
                        setOpenedModalInfo({
                          index,
                          isOpen: true,
                        });
                      }}
                    >
                      Xem
                    </Button>
                    <Button
                      onClick={() => {
                        form.setValues(recruit as any);
                        setOpenedModalEditInfo(true);
                      }}
                    >
                      Sửa
                    </Button>
                    <Button
                      onClick={() => {
                        openConfirmModal({
                          title: 'Tiếp tục',
                          children: <Text size="sm">Bạn có muốn xoá không?</Text>,
                          labels: { confirm: 'Xoá', cancel: 'Huỷ bỏ' },
                          // eslint-disable-next-line @typescript-eslint/no-empty-function
                          onCancel: () => {},
                          onConfirm: () => {
                            deleteRecruitDetail(recruit.id).then(() => {
                              getRecruit();
                              showNotification({
                                title: 'Thành công',
                                message: 'Xoá thành công',
                                color: 'green',
                                autoClose: 5000,
                              });
                            });
                          },
                        });
                      }}
                    >
                      Xoá
                    </Button>
                  </Group>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Modal
        opened={openedModalInfo.isOpen}
        onClose={() => {
          setOpenedModalInfo({
            index: 0,
            isOpen: false,
          });
        }}
        size="100%"
        title="Thông tin chi tiết"
      >
        <Table>
          <tbody>
            <tr>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </Table>
        <TypographyStylesProvider>
          <div
            dangerouslySetInnerHTML={{
              __html: listRecruit?.at(openedModalInfo.index)?.contentVn || '',
            }}
          />
        </TypographyStylesProvider>
      </Modal>
      <Modal
        opened={openedModalAddInfo}
        onClose={() => {
          setOpenedModalAddInfo(false);
        }}
        size="100%"
        title="Thêm mới"
      >
        <form
          onSubmit={form.onSubmit((values) => {
            postRecruitDetail({ ...values }).then(() => {
              showNotification({
                title: 'Thành công',
                message: 'Thêm mới thành công',
                color: 'green',
                autoClose: 5000,
              });
              getRecruit();
              form.setValues({
                roleVn: '',
                roleEn: '',
                addressVn: '',
                addressEn: '',
                contentVn: '',
                contentEn: '',
                salary: '',
                isShow: true,
                priority: listRecruit?.length || 0,
                createdTime: Date.now(),
                createdUser: 'admin',
                modifiedTime: Date.now(),
                modifiedUser: 'admin',
              });
              setOpenedModalAddInfo(false);
            });
          })}
        >
          <Tabs defaultValue="viet">
            <Tabs.List grow>
              <Tabs.Tab value="viet" rightSection={!isVietTabEmpty && <Text c="red"> *</Text>}>
                Tiếng Việt
              </Tabs.Tab>
              <Tabs.Tab
                value="english"
                rightSection={!isEnglishTabEmpty && <Text c="red"> *</Text>}
              >
                English
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="viet" pt="xs">
              <TextInput
                placeholder={labels.roleVn}
                label={labels.roleVn}
                withAsterisk
                required
                {...form.getInputProps('roleVn')}
              />
              <TextInput
                placeholder={labels.addressVn}
                label={labels.addressVn}
                withAsterisk
                required
                {...form.getInputProps('addressVn')}
              />
              <Input.Wrapper id="contentVn" required label={labels.contentVn}>
                <RichTextEditor
                  sticky={false}
                  id="contentVn"
                  required
                  controls={[
                    ['bold', 'italic', 'underline'],
                    ['h1', 'h2', 'h3', 'h4'],
                    ['alignLeft', 'alignCenter', 'alignRight'],
                    ['unorderedList', 'orderedList'],
                    ['sup', 'sub'],
                    ['link', 'clean'],
                  ]}
                  placeholder={labels.contentVn}
                  label={labels.contentVn}
                  {...form.getInputProps('contentVn')}
                />
              </Input.Wrapper>
            </Tabs.Panel>

            <Tabs.Panel value="english" pt="xs">
              <TextInput
                placeholder={labels.roleEn}
                label={labels.roleEn}
                withAsterisk
                required
                {...form.getInputProps('roleEn')}
              />
              <TextInput
                placeholder={labels.addressEn}
                label={labels.addressEn}
                withAsterisk
                required
                {...form.getInputProps('addressEn')}
              />
              <Input.Wrapper id="contentEn" required label={labels.contentEn}>
                <RichTextEditor
                  sticky={false}
                  id="contentEn"
                  required
                  controls={[
                    ['bold', 'italic', 'underline'],
                    ['h1', 'h2', 'h3', 'h4'],
                    ['alignLeft', 'alignCenter', 'alignRight'],
                    ['unorderedList', 'orderedList'],
                    ['sup', 'sub'],
                    ['link', 'clean'],
                  ]}
                  placeholder={labels.contentEn}
                  label={labels.contentEn}
                  {...form.getInputProps('contentEn')}
                />
              </Input.Wrapper>
            </Tabs.Panel>
          </Tabs>
          <NumberInput
            placeholder={labels.salary}
            label={labels.salary}
            required
            hideControls
            {...form.getInputProps('salary')}
          />
          <Divider mt="xs" />
          <Group position="right" mt="xs">
            <Button
              variant="default"
              onClick={() => {
                form.setValues({
                  roleVn: '',
                  roleEn: '',
                  addressVn: '',
                  addressEn: '',
                  contentVn: '',
                  contentEn: '',
                  salary: '',
                  isShow: true,
                  priority: listRecruit?.length || 0,
                  createdTime: Date.now(),
                  createdUser: 'admin',
                  modifiedTime: Date.now(),
                  modifiedUser: 'admin',
                });
                setOpenedModalAddInfo(false);
              }}
            >
              Huỷ bỏ
            </Button>
            <Button type="submit">Thêm mới</Button>
          </Group>
        </form>
      </Modal>
      <Modal
        opened={openedModalEditInfo}
        onClose={() => {
          setOpenedModalEditInfo(false);
        }}
        size="100%"
        title="Chỉnh sửa"
      >
        <form
          onSubmit={form.onSubmit((values) => {
            putRecruitDetail({ ...values }).then(() => {
              showNotification({
                title: 'Thành công',
                message: 'Chỉnh sửa thành công',
                color: 'green',
                autoClose: 5000,
              });
              getRecruit();
              form.setValues({
                roleVn: '',
                roleEn: '',
                addressVn: '',
                addressEn: '',
                contentVn: '',
                contentEn: '',
                salary: '',
                isShow: true,
                priority: listRecruit?.length || 0,
                createdTime: Date.now(),
                createdUser: 'admin',
                modifiedTime: Date.now(),
                modifiedUser: 'admin',
              });
              setOpenedModalEditInfo(false);
            });
          })}
        >
          <Tabs defaultValue="viet">
            <Tabs.List grow>
              <Tabs.Tab value="viet" rightSection={!isVietTabEmpty && <Text c="red"> *</Text>}>
                Tiếng Việt
              </Tabs.Tab>
              <Tabs.Tab
                value="english"
                rightSection={!isEnglishTabEmpty && <Text c="red"> *</Text>}
              >
                English
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="viet" pt="xs">
              <TextInput
                placeholder={labels.roleVn}
                label={labels.roleVn}
                withAsterisk
                required
                {...form.getInputProps('roleVn')}
              />
              <TextInput
                placeholder={labels.addressVn}
                label={labels.addressVn}
                withAsterisk
                required
                {...form.getInputProps('addressVn')}
              />
              <Input.Wrapper id="contentVn" required label={labels.contentVn}>
                <RichTextEditor
                  sticky={false}
                  id="contentVn"
                  required
                  controls={[
                    ['bold', 'italic', 'underline'],
                    ['h1', 'h2', 'h3', 'h4'],
                    ['alignLeft', 'alignCenter', 'alignRight'],
                    ['unorderedList', 'orderedList'],
                    ['sup', 'sub'],
                    ['link', 'clean'],
                  ]}
                  placeholder={labels.contentVn}
                  label={labels.contentVn}
                  {...form.getInputProps('contentVn')}
                />
              </Input.Wrapper>
            </Tabs.Panel>

            <Tabs.Panel value="english" pt="xs">
              <TextInput
                placeholder={labels.roleEn}
                label={labels.roleEn}
                withAsterisk
                required
                {...form.getInputProps('roleEn')}
              />
              <TextInput
                placeholder={labels.addressEn}
                label={labels.addressEn}
                withAsterisk
                required
                {...form.getInputProps('addressEn')}
              />
              <Input.Wrapper id="contentEn" required label={labels.contentEn}>
                <RichTextEditor
                  sticky={false}
                  id="contentEn"
                  required
                  controls={[
                    ['bold', 'italic', 'underline'],
                    ['h1', 'h2', 'h3', 'h4'],
                    ['alignLeft', 'alignCenter', 'alignRight'],
                    ['unorderedList', 'orderedList'],
                    ['sup', 'sub'],
                    ['link', 'clean'],
                  ]}
                  placeholder={labels.contentEn}
                  label={labels.contentEn}
                  {...form.getInputProps('contentEn')}
                />
              </Input.Wrapper>
            </Tabs.Panel>
          </Tabs>
          <NumberInput
            placeholder={labels.salary}
            label={labels.salary}
            required
            hideControls
            {...form.getInputProps('salary')}
          />
          <Divider mt="xs" />
          <Group position="right" mt="xs">
            <Button
              variant="default"
              onClick={() => {
                form.setValues({
                  roleVn: '',
                  roleEn: '',
                  addressVn: '',
                  addressEn: '',
                  contentVn: '',
                  contentEn: '',
                  salary: '',
                  isShow: true,
                  priority: listRecruit?.length || 0,
                  createdTime: Date.now(),
                  createdUser: 'admin',
                  modifiedTime: Date.now(),
                  modifiedUser: 'admin',
                });
                setOpenedModalEditInfo(false);
              }}
            >
              Huỷ bỏ
            </Button>
            <Button type="submit">Chỉnh sửa</Button>
          </Group>
        </form>
      </Modal>
    </Paper>
  );
}

export default Recruit;
