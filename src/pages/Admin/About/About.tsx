import {
  deleteIntroductionDetail,
  postIntroductionDetail,
  putIntroductionDetail,
} from '@apis/introductionApi';
import configs from '@constants/configs';
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
  Image,
  FileButton,
  Box,
  ActionIcon,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { openConfirmModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import RichTextEditor from '@mantine/rte';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { getAboutApi } from 'redux/reducer/about.slice';

const MAX_FILE_LENGTH = 2;

const labels = {
  nameVn: 'Tên',
  nameEn: 'Title',
  contentVn: 'Mô tả',
  contentEn: 'Description',
  image: 'Ảnh',
};

const handleFileChosen = async (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

function About() {
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<File[]>([]);
  const listIntroduction = useAppSelector((state) => state.about.about);
  const [openedModalAddInfo, setOpenedModalAddInfo] = useState(false);
  const [openedModalInfo, setOpenedModalInfo] = useState({
    index: 0,
    isOpen: false,
  });

  const [openedModalEditInfo, setOpenedModalEditInfo] = useState(false);

  const form = useForm({
    initialValues: {
      nameVn: '',
      nameEn: '',
      contentVn: '',
      contentEn: '',
      isShow: true,
      priority: listIntroduction?.length || 0,
      createdTime: Date.now(),
      createdUser: 'admin',
      modifiedTime: Date.now(),
      modifiedUser: 'admin',
      images: [],
    },

    validate: {
      nameVn: (value) => (value.length ? null : `${labels.nameVn} bắt buộc phải nhập`),
      nameEn: (value) => (value.length ? null : `${labels.nameEn} bắt buộc phải nhập`),
      contentVn: (value) => (value.length ? null : `${labels.contentVn} bắt buộc phải nhập`),
      contentEn: (value) => (value.length ? null : `${labels.contentEn} bắt buộc phải nhập`),
    },
  });
  const isVietTabEmpty = form?.values?.nameVn?.length && form?.values?.contentVn?.length;
  const isEnglishTabEmpty = form?.values?.nameEn?.length && form?.values?.contentEn?.length;
  const [images, setImages] = useState<any>([]);
  // const images: any = [];
  const getIntroduction = () => {
    dispatch(getAboutApi());
  };
  useEffect(() => {
    getIntroduction();
  }, []);
  useEffect(() => {
    Promise.all(
      files.map((file) =>
        handleFileChosen(file).then((res) => ({
          name: file.name,
          url: res,
          type: file.type,
        })),
      ),
    ).then((res) => {
      console.log(res);
      setImages(res);
    });
  }, [files]);
  return (
    <Paper shadow="xs" p="md">
      <Button
        onClick={() => {
          form.setValues({
            nameVn: '',
            nameEn: '',
            contentVn: '',
            contentEn: '',
            isShow: true,
            priority: listIntroduction?.length || 0,
            createdTime: Date.now(),
            createdUser: 'admin',
            modifiedTime: Date.now(),
            modifiedUser: 'admin',
            images: [],
          });
          setOpenedModalAddInfo(true);
        }}
      >
        Tạo mới
      </Button>
      <Table highlightOnHover withColumnBorders>
        <thead>
          <tr>
            <th style={{ width: 40 }}>Hiển thị</th>
            <th>{labels.nameVn}</th>
            <th style={{ width: '20%' }}>{labels.image}</th>
            <th style={{ width: 100 }}>Độ ưu tiên</th>
            <th style={{ width: 320 }}>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {!!listIntroduction?.length &&
            listIntroduction.map((introduction, index) => (
              <tr key={introduction.id}>
                <td>
                  <Switch
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    checked={introduction.isShow}
                    onClick={(event: any) => {
                      const data = new FormData();
                      data.append(
                        'introducevo',
                        new Blob(
                          [JSON.stringify({ ...introduction, isShow: event.target.checked })],
                          {
                            type: 'application/json',
                          },
                        ),
                      );
                      data.append('file', new Blob([], { type: 'multipart/form-data' }));
                      putIntroductionDetail(data).then(() => {
                        getIntroduction();
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
                    {introduction.nameVn}
                  </Anchor>
                </td>
                <td>
                  <Image
                    src={`${configs.BASE_IMAGE_URL}${introduction?.images[0]?.url}`}
                    withPlaceholder
                  />
                </td>
                <td>
                  <Group>
                    <ActionIcon>
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
                    <ActionIcon>
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
                        form.setValues(introduction as any);
                        setImages(introduction.images);
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
                            deleteIntroductionDetail(introduction.id).then(() => {
                              getIntroduction();
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
              __html: listIntroduction?.at(openedModalInfo.index)?.contentVn || '',
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
            const data = new FormData();
            images.forEach((image: any) => {
              const base64 = image.url.split(';base64,');
              const byteCharacters = atob(base64[1]);
              const byteNumbers = new Array(byteCharacters.length);
              for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);
              data.append('file', new Blob([byteArray], { type: image.type }), image.name);
            });
            const listImages = [
              ...files.map(() => ({
                createdTime: Date.now(),
                createdUser: 'admin',
                modifiedTime: Date.now(),
                modifiedUser: 'admin',
              })),
            ];
            data.append(
              'introducevo',
              new Blob([JSON.stringify({ ...values, images: listImages })], {
                type: 'application/json',
              }),
            );
            postIntroductionDetail(data);
            getIntroduction();
            setOpenedModalAddInfo(false);
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
                placeholder={labels.nameVn}
                label={labels.nameVn}
                withAsterisk
                required
                {...form.getInputProps('nameVn')}
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
                placeholder={labels.nameEn}
                label={labels.nameEn}
                withAsterisk
                required
                {...form.getInputProps('nameEn')}
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
          <Input.Wrapper
            required
            label={labels.image}
            description={`Số hình ảnh tối đa là ${MAX_FILE_LENGTH}`}
          >
            <Group mt={6}>
              {files.length < MAX_FILE_LENGTH && (
                <FileButton
                  onChange={(payload: any) =>
                    setFiles((prev) => [
                      ...prev,
                      ...payload.slice(0, MAX_FILE_LENGTH - prev.length),
                    ])
                  }
                  accept="image/*"
                  multiple
                >
                  {(props) => (
                    <Box
                      {...props}
                      sx={{
                        width: 100,
                        height: 100,
                        border: '3px dashed black',
                        borderRadius: 6,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        height={48}
                        width={48}
                        aria-hidden="true"
                        focusable="false"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        className="StyledIconBase-ea9ulj-0 bWRyML"
                      >
                        <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
                      </svg>
                    </Box>
                  )}
                </FileButton>
              )}
              {images.map((file: any, index: any) => (
                <Image
                  key={index}
                  width={100}
                  height={100}
                  radius={6}
                  withPlaceholder
                  src={file?.url}
                ></Image>
              ))}
            </Group>
          </Input.Wrapper>
          <Divider mt="xs" />
          <Group position="right" mt="xs">
            <Button
              variant="default"
              onClick={() => {
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
            const data = new FormData();
            data.append(
              'file',
              new Blob(undefined, {
                type: 'multipart/form-data',
              }),
            );
            data.append(
              'introducevo',
              new Blob([JSON.stringify({ ...values })], {
                type: 'application/json',
              }),
            );
            putIntroductionDetail(data).then(() => {
              showNotification({
                title: 'Thành công',
                message: 'Chỉnh sửa thành công',
                color: 'green',
                autoClose: 5000,
              });
              getIntroduction();
              form.setValues({
                nameVn: '',
                nameEn: '',
                contentVn: '',
                contentEn: '',
                isShow: true,
                priority: listIntroduction?.length || 0,
                createdTime: Date.now(),
                createdUser: 'admin',
                modifiedTime: Date.now(),
                modifiedUser: 'admin',
                images: [],
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
                placeholder={labels.nameVn}
                label={labels.nameVn}
                withAsterisk
                required
                {...form.getInputProps('nameVn')}
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
                placeholder={labels.nameEn}
                label={labels.nameEn}
                withAsterisk
                required
                {...form.getInputProps('nameEn')}
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
          <Input.Wrapper
            required
            label={labels.image}
            description={`Số hình ảnh tối đa là ${MAX_FILE_LENGTH}`}
          >
            <Group mt={6}>
              {files.length < MAX_FILE_LENGTH && (
                <FileButton
                  onChange={(payload: any) =>
                    setFiles((prev) => [
                      ...prev,
                      ...payload.slice(0, MAX_FILE_LENGTH - prev.length),
                    ])
                  }
                  accept="image/*"
                  multiple
                >
                  {(props) => (
                    <Box
                      {...props}
                      sx={{
                        width: 100,
                        height: 100,
                        border: '3px dashed black',
                        borderRadius: 6,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        height={48}
                        width={48}
                        aria-hidden="true"
                        focusable="false"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        className="StyledIconBase-ea9ulj-0 bWRyML"
                      >
                        <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
                      </svg>
                    </Box>
                  )}
                </FileButton>
              )}
              {images.map((file: any, index: any) => (
                <Image
                  key={index}
                  width={100}
                  height={100}
                  radius={6}
                  withPlaceholder
                  src={configs.BASE_IMAGE_URL + file?.url}
                ></Image>
              ))}
            </Group>
          </Input.Wrapper>
          <Divider mt="xs" />
          <Group position="right" mt="xs">
            <Button
              variant="default"
              onClick={() => {
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

export default About;
