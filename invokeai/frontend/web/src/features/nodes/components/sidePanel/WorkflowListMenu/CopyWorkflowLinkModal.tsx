import {
  Button,
  Flex,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from '@invoke-ai/ui-library';
import { useStore } from '@nanostores/react';
import { $projectUrl } from 'app/store/nanostores/projectId';
import { buildUseDisclosure } from 'common/hooks/useBoolean';
import { toast } from 'features/toast/toast';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PiCopyBold } from 'react-icons/pi';

export const [useCopyWorkflowLinkModal] = buildUseDisclosure(false);

export const CopyWorkflowLinkModal = ({ workflowId, workflowName }: { workflowId: string; workflowName: string }) => {
  const projectUrl = useStore($projectUrl);
  const { t } = useTranslation();

  const workflowLink = useMemo(() => {
    return `${projectUrl}/studio?selectedWorkflowId=${workflowId}`;
  }, [projectUrl, workflowId]);

  const copyWorkflowLinkModal = useCopyWorkflowLinkModal();

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(workflowLink);
    toast({
      status: 'success',
      title: t('toast.linkCopied'),
    });
    copyWorkflowLinkModal.close();
  }, [workflowLink, t, copyWorkflowLinkModal]);

  return (
    <Modal
      isOpen={copyWorkflowLinkModal.isOpen}
      onClose={copyWorkflowLinkModal.close}
      isCentered
      size="lg"
      useInert={false}
    >
      <ModalContent>
        <ModalHeader>
          <Flex flexDir="column" gap={2}>
            <Heading fontSize="xl">{t('workflows.copyShareLinkForWorkflow')}</Heading>
            <Text fontSize="md">{workflowName}</Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex layerStyle="third" p={5} borderRadius="base">
            <Text fontWeight="semibold">{workflowLink}</Text>
            <IconButton aria-label="Copy Link" icon={<PiCopyBold />} onClick={handleCopy} />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button onClick={copyWorkflowLinkModal.close}>{t('common.close')}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};