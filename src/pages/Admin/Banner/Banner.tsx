import { postIntroductionDetail } from '@apis/introductionApi';
import { Button, Divider, Group, Modal, NumberInput, Paper, Table, Tabs, Text, TextInput, TypographyStylesProvider, Input, Switch, Anchor, Image, FileButton, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import RichTextEditor from '@mantine/rte';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { getAboutApi } from 'redux/reducer/about.slice';

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
    const form = useForm({
        initialValues: {
            id: listIntroduction?.length || 0,
            nameVn: '',
            nameEn: '',
            addressVn: '',
            addressEn: '',
            contentVn: '',
            contentEn: '',
            salary: '',
            isShow: true,
            priority: listIntroduction?.length || 0,
            createdTime: Date.now(),
            createdUser: 'admin',
            modifiedTime: Date.now(),
            modifiedUser: 'admin',
            images: []
        },

        validate: {
            nameVn: (value) => value.length ? null : `${labels.nameVn} bắt buộc phải nhập`,
            nameEn: (value) => value.length ? null : `${labels.nameEn} bắt buộc phải nhập`,
            contentVn: (value) => value.length ? null : `${labels.contentVn} bắt buộc phải nhập`,
            contentEn: (value) => value.length ? null : `${labels.contentEn} bắt buộc phải nhập`,
        },
    });
    const isVietTabEmpty = form?.values?.nameVn?.length && form?.values?.addressVn?.length && form?.values?.contentVn?.length;
    const isEnglishTabEmpty = form?.values?.nameEn?.length && form?.values?.addressEn?.length && form?.values?.contentEn?.length;
    const [images, setImages] = useState<any>([]);
    // const images: any = [];
    const getIntroduction = () => {
        dispatch(getAboutApi());
    };
    useEffect(() => {
        getIntroduction();
    }, []);
    useEffect(() => {
        Promise.all(files.map(file => handleFileChosen(file).then((res) => ({
            name: file.name,
            url: res,
            type: file.type
        })))).then((res) => {
            console.log(res);
            setImages(res);
        });
    }, [files]);
    return (
        <Paper shadow="xs" p="md">
            <Button onClick={() => {
                setOpenedModalAddInfo(true);
            }}>Tạo mới</Button>
            <Table highlightOnHover withColumnBorders>
                <thead>
                    <tr>
                        <th style={{ width: 40 }}>Hiển thị</th>
                        <th>{labels.nameVn}</th>
                        <th>{labels.image}</th>
                        <th style={{ width: 80 }}>Độ ưu tiên</th>
                        <th style={{ width: 320 }}>Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !!listIntroduction?.length && listIntroduction.map((introduction, index) => (
                            <tr key={introduction.id}>
                                <td><Switch sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }} /></td>
                                <td>
                                    <Anchor onClick={() => {
                                        setOpenedModalInfo({
                                            index,
                                            isOpen: true,
                                        });
                                    }}>
                                        {introduction.nameVn}
                                    </Anchor>
                                </td>
                                <td><Image src={`${import.meta.env.VITE_BASE_IMAGE_URL}${introduction?.images[0]?.url?.replace('/public', '')}`} withPlaceholder /></td>
                                <td></td>
                                <td>
                                    <Group grow>
                                        <Button onClick={() => {
                                            setOpenedModalInfo({
                                                index,
                                                isOpen: true,
                                            });
                                        }}>Xem</Button>
                                        <Button>Sửa</Button>
                                        <Button>Xoá</Button>
                                    </Group>
                                </td>
                            </tr>
                        ))
                    }
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
                    <div dangerouslySetInnerHTML={{ __html: listIntroduction?.at(openedModalInfo.index)?.contentVn || '' }} />
                </TypographyStylesProvider>
            </Modal>
            <Modal opened={openedModalAddInfo}
                onClose={() => {
                    setOpenedModalAddInfo(false);
                }}
                size="100%"
                title="Thêm mới"
            >
                <form onSubmit={form.onSubmit((values) => {
                    const data = new FormData();
                    const imgs = images?.map((image: any) => {
                        // const base64 = image.url.split(';base64,');
                        // const byteCharacters = atob(base64[1]);
                        // const byteNumbers = new Array(byteCharacters.length);
                        // for (let i = 0; i < byteCharacters.length; i++) {
                        //     byteNumbers[i] = byteCharacters.charCodeAt(i);
                        // }
                        // const byteArray = new Uint8Array(byteNumbers);
                        const blob = new Blob([image.url], { type: 'multipart/form-data' });
                        return blob;
                    }) || [];
                    data.append('files',new Blob([imgs], { type: 'multipart/form-data'}));
                    data.append('introducevo',new Blob([JSON.stringify({...values, images: []})],{
                        type: 'application/json'
                    }));
                    console.log(values);
                    postIntroductionDetail(data);
                })}>
                    <Tabs defaultValue="viet">
                        <Tabs.List grow>
                            <Tabs.Tab value="viet" rightSection={
                                !isVietTabEmpty && <Text c="red"> *</Text>
                            }>Tiếng Việt</Tabs.Tab>
                            <Tabs.Tab value="english" rightSection={
                                !isEnglishTabEmpty && <Text c="red"> *</Text>
                            }>English</Tabs.Tab>
                        </Tabs.List>
                        <Tabs.Panel value="viet" pt="xs">
                            <TextInput
                                placeholder={labels.nameVn}
                                label={labels.nameVn}
                                withAsterisk
                                required
                                {...form.getInputProps('nameVn')}
                            />
                            <Input.Wrapper
                                id="contentVn"
                                required
                                label={labels.contentVn}
                            >
                                <RichTextEditor
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
                                    {...form.getInputProps('contentVn')} />
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
                            <Input.Wrapper
                                id="contentEn"
                                required
                                label={labels.contentEn}
                            >
                                <RichTextEditor
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
                                    {...form.getInputProps('contentEn')} />
                            </Input.Wrapper>
                        </Tabs.Panel>
                    </Tabs>
                    <Group mt={12}>
                        <FileButton onChange={setFiles} accept="image/png,image/jpeg" multiple>
                            {(props) => (<Box {...props} sx={{
                                width: 100,
                                height: 100,
                                border: '3px dashed black',
                                borderRadius: 6,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer'
                            }}>
                                <svg viewBox="0 0 24 24" height={48} width={48} aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="StyledIconBase-ea9ulj-0 bWRyML"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" /></svg>
                            </Box>)}
                        </FileButton>
                        {images.map((file: any, index: any) => (
                            <Image key={index} width={100} height={100} radius={6} withPlaceholder src={
                                file?.url
                            }></Image>
                        ))}
                    </Group>
                    <Divider mt="xs" />
                    <Group position="right" mt="xs">
                        <Button variant="default" onClick={() => {
                            setOpenedModalAddInfo(false);
                        }}>Huỷ bỏ</Button>
                        <Button type="submit">Thêm mới</Button>
                    </Group>
                </form>
            </Modal>
        </Paper >
    );
}

export default About;
