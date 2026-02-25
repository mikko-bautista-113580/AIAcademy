"""
Convert PPTX slides to PNG images using PowerPoint COM automation.
Generates one PNG per slide in public/slides/<presentation-name>/slide-N.png
"""
import os
import sys
import shutil
import time

def convert_pptx_to_images(pptx_path, output_dir, width=1920, height=1080):
    """Convert a PPTX file to PNG images using PowerPoint COM."""
    import comtypes.client
    
    pptx_path = os.path.abspath(pptx_path)
    output_dir = os.path.abspath(output_dir)
    
    if os.path.exists(output_dir):
        shutil.rmtree(output_dir)
    os.makedirs(output_dir, exist_ok=True)
    
    print(f"Opening PowerPoint for: {os.path.basename(pptx_path)}")
    
    powerpoint = comtypes.client.CreateObject("PowerPoint.Application")
    powerpoint.Visible = 1
    
    try:
        presentation = powerpoint.Presentations.Open(pptx_path, WithWindow=False)
        slide_count = presentation.Slides.Count
        print(f"  Found {slide_count} slides")
        
        for i in range(1, slide_count + 1):
            slide = presentation.Slides(i)
            output_path = os.path.join(output_dir, f"slide-{i}.png")
            slide.Export(output_path, "PNG", width, height)
            print(f"  Exported slide {i}/{slide_count}")
        
        presentation.Close()
        print(f"  Done! {slide_count} images saved to {output_dir}")
        return slide_count
    finally:
        powerpoint.Quit()


def main():
    presentations = [
        ("public/AIModelsComparison_November23.pptx", "public/slides/nov23"),
        ("public/AIModelsComparison_September16.pptx", "public/slides/sep16"),
        ("public/WorkflowCreator.pptx", "public/slides/workflow-creator"),
        ("public/EstimatedTimeCreation.pptx", "public/slides/estimated-time"),
        ("public/ModelToUse.pptx", "public/slides/model-to-use"),
        ("public/Pull Request Roadmap.pptx", "public/slides/pr-roadmap"),
        ("public/Automating Test Case Association in Azure DevOps.pptx", "public/slides/test-case-association"),
        ("public/Automated GW Endpoint Generator.pptx", "public/slides/gw-endpoint-generator"),
        ("public/Automated Microservice Endpoint Generator.pptx", "public/slides/microservice-endpoint-generator"),
    ]
    
    try:
        import comtypes.client
    except ImportError:
        print("Installing comtypes...")
        os.system(f"{sys.executable} -m pip install comtypes")
        import comtypes.client
    
    results = {}
    for pptx_path, output_dir in presentations:
        if not os.path.exists(pptx_path):
            print(f"SKIP: {pptx_path} not found")
            continue
        count = convert_pptx_to_images(pptx_path, output_dir)
        results[output_dir] = count
        time.sleep(1)
    
    # Print summary for use in Angular component
    print("\n=== RESULTS ===")
    for path, count in results.items():
        print(f"{path}: {count} slides")


if __name__ == "__main__":
    main()
