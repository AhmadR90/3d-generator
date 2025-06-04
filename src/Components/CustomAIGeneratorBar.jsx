import React from 'react';
import GenerateBar3D from './GenerateBar3D';

const CustomAIGenerateBar = ({
  prompt,
  setPrompt,
  resolutionOptions,
  resolutionIndex,
  setResolutionIndex,
  uploadedImage,
  setImage,
  isGenerating,
  onGenerate,
  setIsGenerating,
  onClearCompleted
}) => {
  return (
    <div className="p-4  rounded-lg shadow-sm bg-black">
      <GenerateBar3D
        prompt={prompt}
        setPrompt={setPrompt}
        resolutionOptions={resolutionOptions}
        resolutionIndex={resolutionIndex}
        setResolutionIndex={setResolutionIndex}
        uploadedImage={uploadedImage}
        setUploadedImage={setImage}
        isGenerating={isGenerating}
        onGenerate={onGenerate}
        setIsGenerating={setIsGenerating}
        onClearCompleted={onClearCompleted}
      />
    </div>
  );
};

export default CustomAIGenerateBar;